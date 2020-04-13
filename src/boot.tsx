import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { log } from './log'
import { App } from './App'

export const boot = ({
	target,
	shipmentsURL,
}: {
	target: HTMLElement
	shipmentsURL: string
}) => {
	log('Version:', GLOBAL_VERSION)
	log('Production:', GLOBAL_IS_PRODUCTION)
	log('Source code:', 'https://github.com/distributeaid/shipments')
	log('Shipments URL:', shipmentsURL)
	ReactDOM.render(<App shipmentsURL={shipmentsURL} />, target)
}
