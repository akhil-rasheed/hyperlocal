"use client";

import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function MapContainer() {
  const mapStyles = {
    width: "100%",
    height: "400px",
  };

  const [center, setCenter] = useState(fetchLocation());

  function fetchLocation() {
    const center = {
      lat: 37.7749, // Default latitude
      lng: -122.4194, // Default longitude
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        center.lat = position.coords.latitude;
        center.lng = position.coords.longitude;
      },
      (error) => {
        console.log(error.message);
      }
    );

    return center;
  }
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const options = {
    mapId: "611b6a559ee275bd", //here comes your map id
    zoomControl: false,

    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };
  return (
    <LoadScript googleMapsApiKey={mapsApiKey!}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={14}
        center={center}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
