"use client";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

//useeffect hook to fetch location

const MapContainer = ({ posts }) => {
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
    height: "200px",
  };

  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const options = {
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
        {posts.map((post) => {
          console.log(post.location.coordinates);
          return (
            <Marker
              key={post._id}
              position={{
                lat: post.location.coordinates[1],
                lng: post.location.coordinates[0],
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
