import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { log } from './log'
import { App } from './App'
import { Shipment } from './data/shipments'

const l = (...args: any) => log('App', ...args)

export const boot = ({
	target,
	shipmentsURL,
	fallbackShipments,
}: {
	target: HTMLElement
	shipmentsURL: string
	fallbackShipments: Shipment[]
}) => {
	l('Version:', GLOBAL_VERSION)
	l('Production:', GLOBAL_IS_PRODUCTION)
	l('Source code:', 'https://github.com/distributeaid/shipments')
	l('Shipments URL:', shipmentsURL)
	l('Fallback Shipments', fallbackShipments)
	ReactDOM.render(
		<App shipmentsURL={shipmentsURL} fallbackShipments={fallbackShipments} />,
		target,
	)
}
