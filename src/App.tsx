import * as React from 'react'
import { Map } from './Map'
import styled from 'styled-components'

const Header = styled.header`
	height: 50%;
	width: 100%;
`

export const App = () => (
	<Header>
		<Map />
	</Header>
)
