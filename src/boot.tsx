import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { log } from './log'
import { App } from './App'
import { Shipment } from './data/shipments'

export const boot = ({
	target,
	shipmentsURL,
	fallbackShipments,
}: {
	target: HTMLElement
	shipmentsURL: string
	fallbackShipments: Shipment[]
}) => {
	log('Version:', GLOBAL_VERSION)
	log('Production:', GLOBAL_IS_PRODUCTION)
	log('Source code:', 'https://github.com/distributeaid/shipments')
	log('Shipments URL:', shipmentsURL)
	log('Fallback Shipments', fallbackShipments)
	ReactDOM.render(
		<App shipmentsURL={shipmentsURL} fallbackShipments={fallbackShipments} />,
		target,
	)
}
