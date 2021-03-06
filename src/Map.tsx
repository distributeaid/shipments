import React, { createRef, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import {
	Map as LeafletMap,
	TileLayer,
	Marker,
	Polyline,
	Popup,
} from 'react-leaflet'
import * as L from 'leaflet'
import { Shipment, fetchShipments } from './data/shipments'
import { cache } from './data/cache'
import { colorGenerator } from './style/colors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as TE from 'fp-ts/lib/TaskEither'
import { handleError } from './handleError'
import { formatWeight } from './formatter'
import { LeafletMapStyle, ParcelIcon, MarkerIcon } from './style/Map'

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
			cache(
				shipmentsURL,
				fetchShipments(`https://cors-anywhere.herokuapp.com/${shipmentsURL}`), // https://cors-anywhere.herokuapp.com/ will add CORS headers. Should only be used for PUBLIC URLs.
			),
			TE.map(setShipments),
		)().catch(handleError('Fetch shipments'))
	}, [shipmentsURL])

	const colors = colorGenerator()

	return (
		<>
			<LeafletMapStyle />
			<LeafletMap
				center={[48, 10]}
				zoom={zoom}
				ref={mapRef}
				zoomControl={false}
			>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{shipments?.map(({ origin, destination, contents, weight }, k) => {
					const color = colors.next().value
					const InfoPopup = (
						<Popup>
							<strong>{contents}</strong>
							<br />
							{formatWeight(weight)}
						</Popup>
					)
					return (
						<React.Fragment key={k}>
							<Marker
								icon={L.divIcon({
									className: '',
									iconSize: [20, 30],
									iconAnchor: [10, 30],
									html: renderToString(<MarkerIcon style={{ color }} />),
									popupAnchor: [0, -20],
								})}
								position={origin.position}
								pop
							>
								{InfoPopup}
							</Marker>
							<Marker
								icon={L.divIcon({
									className: '',
									iconSize: [30, 30],
									iconAnchor: [15, 30],
									html: renderToString(<ParcelIcon style={{ color }} />),
									popupAnchor: [0, -20],
								})}
								position={destination.position}
							>
								{InfoPopup}
							</Marker>
							<Polyline
								positions={[origin.position, destination.position]}
								weight={zoom > 16 ? 1 : 2}
								linecap={'round'}
								color={color}
							>
								{InfoPopup}
							</Polyline>
						</React.Fragment>
					)
				})}
			</LeafletMap>
		</>
	)
}
