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
	value: number
}

export const fetchShipments = (
	url: string,
	fetchImplementation?: typeof fetch,
) =>
	TE.tryCatch<ErrorInfo, Shipment[]>(
		async () =>
			(fetchImplementation || fetch)(url)
				.then(async res => res.text())
				.then(res =>
					res
						.split('\n')
						.splice(1)
						.map(s => {
							const [
								name,
								date,
								originLat,
								originLng,
								destinationLat,
								destinationLng,
								weight,
								value,
							] = s.split('\t')
							return {
								name,
								date: new Date(`${date}T00:00:00Z`),
								origin: {
									position: {
										lat: parseFloat(originLat),
										lng: parseFloat(originLng),
									},
								},
								destination: {
									position: {
										lat: parseFloat(destinationLat),
										lng: parseFloat(destinationLng),
									},
								},
								weight: parseInt(weight, 10),
								value: parseInt(value, 10),
							}
						}),
				),
		error => ({
			type: ErrorType.InternalError,
			message: `Failed to fetch shipments! ${(error as Error).message}`,
		}),
	)
