import React, { createRef } from 'react'
import { renderToString } from 'react-dom/server'
import { Map as LeafletMap, TileLayer, Marker, Polyline } from 'react-leaflet'
import * as L from 'leaflet'
import styled from 'styled-components'
import { shipments } from './data/shipments'
import { colorGenerator } from './components/colors'

import MapIcon from '../web/marker.svg'
import ParcelIcon from '../web/parcel.svg'

const StyledMapIcon = styled(MapIcon)`
	width: 20px;
	height: 30px;
`

const StyledParcelIcon = styled(ParcelIcon)`
	width: 30px;
	height: 30px;
`

const StyledLeafletMap = styled(LeafletMap)`
	height: 100%;
	width: 100%;
`

const colors = colorGenerator()

export const Map = () => {
	const mapRef = createRef<LeafletMap>()
	const zoom = 3
	return (
		<>
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
				{shipments.map(({ origin, destination }, k) => {
					const color = colors.next().value
					return (
						<React.Fragment key={k}>
							<Marker
								icon={L.divIcon({
									className: '',
									iconSize: [30, 30],
									iconAnchor: [15, 30],
									html: renderToString(<StyledParcelIcon style={{ color }} />),
								})}
								position={origin.position}
							/>
							<Marker
								icon={L.divIcon({
									className: '',
									iconSize: [20, 30],
									iconAnchor: [10, 30],
									html: renderToString(<StyledMapIcon style={{ color }} />),
								})}
								position={destination.position}
							/>
							<Polyline
								positions={[origin.position, destination.position]}
								weight={zoom > 16 ? 1 : 2}
								linecap={'round'}
								color={color}
							/>
						</React.Fragment>
					)
				})}
			</StyledLeafletMap>
		</>
	)
}