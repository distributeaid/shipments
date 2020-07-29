import * as TE from 'fp-ts/lib/TaskEither'

export enum ErrorType {
	EntityNotFound = 'EntityNotFound',
	BadRequest = 'BadRequest',
	AccessDenied = 'AccessDenied',
	InternalError = 'InternalError',
	Conflict = 'Conflict',
}

export type ErrorInfo = {
	type: ErrorType
	message: string
}

export type Shipment = {
	name: string
	contents: string
	shipper: string
	date: Date
	origin: {
		position: {
			lat: number
			lng: number
		}
	}
	destination: {
		position: {
			lat: number
			lng: number
		}
	}
	weight: number
}

type ShipmentSpreadsheetData = {
	name: string
	shipper: string
	contents: string
	date: string
	originLat: string
	originLng: string
	destinationLat: string
	destinationLng: string
	weight: string
}

export const fetchShipments = (
	url: string,
	fetchImplementation?: typeof fetch,
) =>
	TE.tryCatch<ErrorInfo, Shipment[]>(
		async () =>
			(fetchImplementation ?? fetch)(url)
				.then(async (res) => res.text())
				.then((res) => {
					const table = res.split('\n')
					const keys = table[1]
						.split('\t')
						.map((s) => s.trim())
						.filter((s) => s.length > 0)
					return (
						table
							.splice(2)
							.map((s) => {
								const values = s.split('\t').map((s) => s.trim())
								return keys.reduce(
									(shipment, k, i) => ({
										...shipment,
										[k]: values[i],
									}),
									{} as ShipmentSpreadsheetData,
								)
							})
							// check if all values are set
							.filter(
								(values: any) =>
									!keys.reduce(
										(hasBlank, key) =>
											hasBlank ||
											values[key] === undefined ||
											values[key] === null ||
											values[key].length === 0,
										false,
									),
							)
							.map((s) => ({
								name: s.name,
								shipper: s.shipper,
								contents: s.contents,
								date: new Date(`${s.date}T00:00:00Z`),
								origin: {
									position: {
										lat: parseFloat(s.originLat),
										lng: parseFloat(s.originLng),
									},
								},
								destination: {
									position: {
										lat: parseFloat(s.destinationLat),
										lng: parseFloat(s.destinationLng),
									},
								},
								weight: parseInt(s.weight, 10),
							}))
							// Check if values have been parsed correctly
							// Note: if values get more complext, consider using JSON schema
							.filter(
								(s) =>
									!isNaN(s.origin.position.lat) &&
									!isNaN(s.origin.position.lng) &&
									!isNaN(s.destination.position.lat) &&
									!isNaN(s.destination.position.lng) &&
									!isNaN(s.weight),
							)
					)
				}),
		(error) => ({
			type: ErrorType.InternalError,
			message: `Failed to fetch shipments! ${(error as Error).message}`,
		}),
	)
