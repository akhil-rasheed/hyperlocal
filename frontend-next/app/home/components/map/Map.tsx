"use client";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

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
    height: "300px",
  };

  const onLoad = (circle) => {
    console.log("Circle onLoad circle: ", circle);
  };

  const onUnmount = (circle) => {
    console.log("Circle onUnmount circle: ", circle);
  };
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const options = {
    mapId: "8030df2e9407d0b2",
    zoomControl: false,
    strokeColor: "#21afdd",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#21afdd",
    fillOpacity: 0.35,
    editable: false,
    visible: true,
    radius: 5000,
    zIndex: 1,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };
  return (
    <LoadScript
      googleMapsApiKey={mapsApiKey!}
      mapIds={["8030df2e9407d0b2"]}
      id="8030df2e9407d0b2"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={14}
        center={center}
        options={options}
      >
        <Circle
          // optional
          onLoad={onLoad}
          // optional
          onUnmount={onUnmount}
          // required
          center={center}
          // required
          options={options}
        />
        {posts.map((post) => {
          return post.username?.length % 2 === 0 ? (
            <Marker
              key={post._id}
              position={{
                lat: post.location.coordinates[1],
                lng: post.location.coordinates[0],
              }}
              icon={{
                url: "https://em-content.zobj.net/thumbs/160/twitter/322/soccer-ball_26bd.png",
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              options={{
                clickable: true,
              }}
            />
          ) : (
            <Marker
              key={post._id}
              position={{
                lat: post.location.coordinates[1],
                lng: post.location.coordinates[0],
              }}
              icon={{
                url: "https://em-content.zobj.net/thumbs/160/twitter/322/fire_1f525.png",
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              options={{
                clickable: true,
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
