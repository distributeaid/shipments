import React, { createRef } from 'react'
import { renderToString } from 'react-dom/server'
import { Map as LeafletMap, TileLayer, Marker, Polyline } from 'react-leaflet'
import * as L from 'leaflet'
import styled from 'styled-components'
import { shipments } from './data/shipments'

import MapIcon from '../web/marker.svg'

/**
 * A nice list of colors to use for map markers
 */
const colors = [
	'#03a8a0',
	'#039c4b',
	'#66d313',
	'#fedf17',
	'#ff0984',
	'#21409a',
	'#04adff',
	'#e48873',
	'#f16623',
	'#f44546',
	'#1f73b7',
	'#04444d',
	'#038153',
	'#ed961c',
	'#cc3340',
	'#a81897',
	'#d42054',
	'#c72a1c',
	'#c44f00',
	'#ffbb10',
	'#058541',
	'#028079',
	'#1371d6',
	'#3353e2',
	'#6a27b8',
	'#337fbd',
	'#335d63',
	'#228f67',
	'#f5a133',
	'#d93f4c',
	'#d653c2',
	'#ec4d63',
	'#e34f32',
	'#de701d',
	'#ffd424',
	'#00a656',
	'#02a191',
	'#3091ec',
	'#5d7df5',
	'#b552e2',
]

const colorGenerator = (function*() {
	let i = 0
	while (true) {
		yield colors[i]
		i = (i + 1) % colors.length
	}
})()

const StyledMapIcon = styled(MapIcon)`
	width: 20px;
	height: 30px;
`

const StyledLeafletMap = styled(LeafletMap)`
	height: 100%;
	width: 100%;
`

export const Map = () => {
	const mapRef = createRef<LeafletMap>()
	const zoom = 3
	return (
		<StyledLeafletMap
			center={[48, 10]}
			zoom={zoom}
			ref={mapRef}
			zoomControl={false}
		>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/*<ZoomControl position={'bottomright'} />*/}
			{shipments.map(({ origin, destination }, k) => {
				const color = colorGenerator.next().value
				return (
					<React.Fragment key={k}>
						<Marker
							icon={L.divIcon({
								className: `originIcon`,
								iconSize: [20, 30],
								iconAnchor: [10, 30],
								html: renderToString(
									<>
										<StyledMapIcon style={{ color }} />
									</>,
								),
							})}
							position={origin.position}
						/>
						<Marker
							icon={L.divIcon({
								className: `destinationIcon`,
								iconSize: [20, 30],
								iconAnchor: [10, 30],
								html: renderToString(
									<>
										<StyledMapIcon style={{ color }} />
									</>,
								),
							})}
							position={destination.position}
						/>
						<Polyline
							positions={[origin.position, destination.position]}
							weight={zoom > 16 ? 1 : 2}
							linecap={'round'}
							color={'#000000'}
						/>
					</React.Fragment>
				)
			})}
		</StyledLeafletMap>
	)
}
