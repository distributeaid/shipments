import * as React from 'react'
import { Map } from './Map'
import { Shipment } from './data/shipments'
import { Header } from './style/Header'
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
		<Main></Main>
	</>
)
