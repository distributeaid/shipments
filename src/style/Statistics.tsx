import React from 'react'
import styled from 'styled-components'

const StyledStatisticsContainer = styled.dl`
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 1px 1px;
	grid-template-areas: '. . .' '. . .';
	grid-auto-flow: column;
`

const DT = styled.dt`
	padding: 0;
	margin: 0;
	text-align: center;
	grid-row: 2;
`
const DD = styled(DT)`
	padding: 1rem;
	font-weight: bold;
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
