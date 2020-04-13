import * as React from 'react'
import { Map } from './Map'
import styled from 'styled-components'
import { Shipment } from './data/shipments'

const Header = styled.header`
	height: 50%;
	width: 100%;
`

export const App = ({
	shipmentsURL,
	fallbackShipments,
}: {
	shipmentsURL: string
	fallbackShipments: Shipment[]
}) => (
	<Header>
		<Map shipmentsURL={shipmentsURL} fallbackShipments={fallbackShipments} />
	</Header>
)
