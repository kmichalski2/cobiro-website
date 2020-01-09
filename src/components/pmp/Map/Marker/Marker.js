import React from "react"
import GoogleMapReact from 'google-map-react';

import MarkerStyles from './Marker.module.scss'


const Marker = ({googleMarker}) => (

    <div className={[MarkerStyles.marker, googleMarker ? MarkerStyles.googleMarker : null].join(' ')}></div>

)

export default Marker
