import styled, { createGlobalStyle } from 'styled-components'

import MarkerIconSVG from '../../web/marker.svg'
import ParcelIconSVG from '../../web/parcel.svg'

export const MarkerIcon = styled(MarkerIconSVG)`
	width: 20px;
	height: 30px;
`

export const ParcelIcon = styled(ParcelIconSVG)`
	width: 30px;
	height: 30px;
`

export const LeafletMapStyle = createGlobalStyle`
.leaflet-container {
	height: 100%;
	width: 100%;
}
`
