import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;
import { cordToStreet } from "../lib/cordToStreet";
const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const onLoad = (marker) => {
  console.log("marker: ", marker);
};
async function getLoc(lat, lng) {
  const res = await cordToStreet(lat, lng);
  console.log(res);
}
export default function App() {
  const [location, setLocation] = useState({
    lat: 11.14450170117654,
    lng: 75.96522120672375,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPSKEY, // ,
    // ...otherOptions
  });
  if (isLoaded)
    return (
      <>
        Set your location : <button>Clicke me</button>
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={location}
        >
          <Marker
            onLoad={onLoad}
            position={location}
            draggable={true}
            onDragEnd={(e) => {
              console.log(e.latLng.lat() + " " + e.latLng.lng());
              getLoc(e.latLng.lat(), e.latLng.lng());
            }}
          />
        </GoogleMap>
      </>
    );
}
