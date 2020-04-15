import React from 'react'
import styled from 'styled-components'
import { wideBreakpoint } from './settings'

const StyledStatisticsContainer = styled.dl`
	padding: 0;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 0 0;
	grid-auto-flow: column;
	max-width: ${wideBreakpoint};
`

const DT = styled.dt`
	padding: 0;
	margin: 0;
	text-align: center;
	grid-row: 2;
`
const DD = styled.dd`
	padding: 2rem 0 0 0;
	margin: 0;
	font-weight: bold;
	text-align: center;
	font-size: 200%;
	grid-row: 1;
`

export const Statistic = ({
	value,
	label,
	col,
}: {
	value: any
	label: string
	col?: number
}) => (
	<>
		<DT style={{ gridColumn: col }}>{label}</DT>
		<DD style={{ gridColumn: col }}>{value}</DD>
	</>
)

export const StatisticsContainer = ({
	children,
}: {
	children: React.ReactElement[]
}) => (
	<StyledStatisticsContainer>
		{children.map((child, k) => (
			<child.type {...child.props} key={k} col={k + 1} />
		))}
	</StyledStatisticsContainer>
)
