import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { log } from './log'
import { App } from './App'

export const boot = ({ target }: { target: HTMLElement }) => {
	log('Version:', GLOBAL_VERSION)
	log('Production:', GLOBAL_IS_PRODUCTION)

	ReactDOM.render(<App />, target)
}
