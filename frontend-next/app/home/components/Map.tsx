"use client";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

//useeffect hook to fetch location

const MapContainer = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const mapStyles = {
    width: "100%",
    height: "400px",
  };

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
};

export default MapContainer;
