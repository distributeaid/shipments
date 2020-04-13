import * as React from 'react'
import styled from 'styled-components'
import { DA_PURPLE, DA_PURPLE_LIGHT } from './colors'
import { mobileBreakpoint, wideBreakpoint } from './settings'

import GithubIcon from 'feather-icons/dist/icons/github.svg'
import EmailIcon from 'feather-icons/dist/icons/mail.svg'
import TwitterIcon from 'feather-icons/dist/icons/twitter.svg'
import InstagramIcon from 'feather-icons/dist/icons/instagram.svg'

const StyledFooter = styled.footer`
	padding: 1rem 2rem;
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

const Nav = styled.nav`
	a {
		margin: 0 0.5rem;
	}
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
			<Nav>
				<a
					href={GLOBAL_GITHUB_URL}
					rel="noopener noreferrer"
					target="_blank"
					title={'Contribute to this project on GitHub'}
				>
					<GithubIcon />
				</a>
				<a
					href="mailto:hello@distributeaid.org"
					rel="noopener noreferrer"
					target="_blank"
					title={'Contact us via email'}
				>
					<EmailIcon />
				</a>
				<a
					href="https://twitter.com/distributeaid"
					rel="noopener noreferrer"
					target="_blank"
					title={'Follow us on Twitter'}
				>
					<TwitterIcon />
				</a>
				<a
					href="https://instagram.com/distributeaid"
					rel="noopener noreferrer"
					target="_blank"
					title={'Follow us on Instagram'}
				>
					<InstagramIcon />
				</a>
			</Nav>
			<p>
				&copy; 2020{' '}
				<a
					href="https://distributeaid.org"
					rel="noopener noreferrer"
					target="_blank"
				>
					Distribute Aid
				</a>
				. All rights reserved.
			</p>
		</Copyright>
	</StyledFooter>
)
