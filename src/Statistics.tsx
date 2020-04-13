import React, { useEffect, useState } from 'react'
import { Shipment, fetchShipments } from './data/shipments'
import { cache } from './data/cache'
import { pipe } from 'fp-ts/lib/pipeable'
import * as TE from 'fp-ts/lib/TaskEither'
import { handleError } from './handleError'
import { StatisticsContainer, Statistic } from './style/Statistics'

const numberFormatter = new Intl.NumberFormat(navigator.language, {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
})
const currencyFormatter = new Intl.NumberFormat(navigator.language, {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
})

export const Statistics = ({
	shipmentsURL,
	fallbackShipments,
}: {
	shipmentsURL: string
	fallbackShipments: Shipment[]
}) => {
	const [shipments, setShipments] = useState<Shipment[]>(fallbackShipments)

	useEffect(() => {
		pipe(
			cache(shipmentsURL, fetchShipments(shipmentsURL)),
			TE.map(setShipments),
		)().catch(handleError('Fetch shipments'))
	}, [shipmentsURL])

	const totalWeight = shipments.reduce(
		(total, { weight }) => total + Math.round(weight / 1000),
		0,
	)

	const totalValue = shipments.reduce((total, { value }) => total + value, 0)

	return (
		<StatisticsContainer>
			<Statistic value={shipments.length} label="shipments" />
			<Statistic
				value={`${numberFormatter.format(totalWeight)} t`}
				label="shipped"
			/>
			<Statistic value={currencyFormatter.format(totalValue)} label="shipped" />
		</StatisticsContainer>
	)
}
