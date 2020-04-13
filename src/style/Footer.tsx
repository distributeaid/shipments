import * as React from 'react'
import styled from 'styled-components'
import { DA_PURPLE, DA_PURPLE_LIGHT } from './colors'
import { mobileBreakpoint, wideBreakpoint } from './settings'

const StyledFooter = styled.footer`
	padding: 1rem;
	@media (min-width: ${mobileBreakpoint}) {
		padding: 4rem;
	}

	background: linear-gradient(
		to right,
		${DA_PURPLE} 25%,
		${DA_PURPLE_LIGHT} 100%
	);
	color: #ffffffcc;
	a {
		color: #ffffffcc;
	}
	p {
		line-height: 1.5rem;
	}
`

const Title = styled.h2`
	font-size: 125%;
`
const Section = styled.section`
	max-width: ${wideBreakpoint};
	margin: auto;
`
const Copyright = styled(Section)`
	font-size: 80%;
	opacity: 0.8;
	text-align: center;
	margin-top: 4rem;
`

export const Footer = ({ shipmentsURL }: { shipmentsURL: string }) => (
	<StyledFooter>
		<Section>
			<Title>About those numbers ...</Title>
			<p>
				The numbers you see here are not real-time. We need to ensure that we do
				not disclose information that can be used to harm our partners, aid
				workers on the ground or in any way jeopardize the safety of our
				operation and shipments. Therefore we maintain{' '}
				<a href={shipmentsURL} rel="noopener noreferrer" target="_blank">
					a separate data source
				</a>{' '}
				that contains information which we consider safe to be shared. This data
				source is use as the basis for the visualizations presented on this
				page.
			</p>
		</Section>
		<Copyright>
			&copy; 2020{' '}
			<a
				href="https://distributeaid.org"
				rel="noopener noreferrer"
				target="_blank"
			>
				Distribute Aid
			</a>
			. All rights reserved.
		</Copyright>
	</StyledFooter>
)
