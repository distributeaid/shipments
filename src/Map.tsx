import React, { createRef, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { Map as LeafletMap, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import * as L from 'leaflet'
import { Shipment, fetchShipments } from './data/shipments'
import { cache } from './data/cache'
import { colorGenerator } from './style/colors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as TE from 'fp-ts/lib/TaskEither'
import { handleError } from './handleError'
import { formatCurrency, formatWeight } from './formatter'
import {
	LeafletMap as StyledLeafletMap,
	ParcelIcon,
	MarkerIcon,
} from './style/Map'


export const Map = ({
	shipmentsURL,
	fallbackShipments,
}: {
	shipmentsURL: string
	fallbackShipments: Shipment[]
}) => {
	const mapRef = createRef<LeafletMap>()
	const [shipments, setShipments] = useState<Shipment[]>(fallbackShipments)
	const zoom = 3

	useEffect(() => {
		pipe(
			cache(shipmentsURL, fetchShipments(shipmentsURL)),
			TE.map(setShipments),
		)().catch(handleError('Fetch shipments'))
	}, [shipmentsURL])

	const colors = colorGenerator()

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
				{shipments?.map(({ origin, destination, name, weight, value }, k) => {
					const color = colors.next().value
					return (
						<React.Fragment key={k}>
							<Marker
								icon={L.divIcon({
									className: '',
									iconSize: [20, 30],
									iconAnchor: [10, 30],
									html: renderToString(<MarkerIcon style={{ color }} />),
									popupAnchor: [0,-20],
								})}
								position={origin.position}
							pop>
								<Popup>
									{name}<br/>
									Weight: {formatWeight(weight)}<br/>
									Value: {formatCurrency(value)}
								</Popup>
							</Marker>
							<Marker
								icon={L.divIcon({
									className: '',
									iconSize: [30, 30],
									iconAnchor: [15, 30],
									html: renderToString(<ParcelIcon style={{ color }} />),
									popupAnchor: [0,-20],
								})}
								position={destination.position}>
								<Popup>
									{name}<br/>
									Weight: {formatWeight(weight)}<br/>
									Value: {formatCurrency(value)}
								</Popup>
							</Marker>
							<Polyline
								positions={[origin.position, destination.position]}
								weight={zoom > 16 ? 1 : 2}
								linecap={'round'}
								color={color}>
								<Popup>
									{name}<br/>
									Weight: {formatWeight(weight)}<br/>
									Value: {formatCurrency(value)}
								</Popup>
							</Polyline>
						</React.Fragment>
					)
				})}
			</StyledLeafletMap>
		</>
	)
}
