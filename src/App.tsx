import * as React from 'react'
import { Map } from './Map'
import { Statistics } from './Statistics'
import { Shipment } from './data/shipments'
import { Header } from './style/Header'
import { Footer } from './style/Footer'
import { Main } from './style/Main'

export const App = ({
	shipmentsURL,
	fallbackShipments,
}: {
	shipmentsURL: string
	fallbackShipments: Shipment[]
}) => (
	<>
		<Header>
			<Map shipmentsURL={shipmentsURL} fallbackShipments={fallbackShipments} />
		</Header>
		<Main>
			<Statistics
				shipmentsURL={shipmentsURL}
				fallbackShipments={fallbackShipments}
			/>
		</Main>
		<Footer shipmentsURL={shipmentsURL} />
	</>
)
