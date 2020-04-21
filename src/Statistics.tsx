import React, { useEffect, useState } from 'react'
import { Shipment, fetchShipments } from './data/shipments'
import { cache } from './data/cache'
import { pipe } from 'fp-ts/lib/pipeable'
import * as TE from 'fp-ts/lib/TaskEither'
import { handleError } from './handleError'
import { formatCurrency, formatWeight } from './formatter'
import { StatisticsContainer, Statistic } from './style/Statistics'

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
		(total, { weight }) => total + weight,
		0,
	)

	const totalValue = shipments.reduce((total, { value }) => total + value, 0)

	return (
		<StatisticsContainer>
			<Statistic value={shipments.length} label="shipments" />
			<Statistic
				value={formatWeight(totalWeight)}
				label="shipped"
			/>
			<Statistic value={formatCurrency(totalValue)} label="shipped" />
		</StatisticsContainer>
	)
}
