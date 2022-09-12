import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;
import { cordToStreet } from "../lib/cordToStreet";
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

// const onLoad = (marker) => {
//   console.log("marker: ", marker);
// };
let begin = {
  lat: 11.472477361674866,
  lng: 75.85618379408506,
};
export default function App() {
  const [map, setMap] = useState(null);

  const [location, setLocation] = useState(begin);

  async function getLoc(lat, lng) {
    console.log(map.zoom);
    const res = await cordToStreet(lat, lng);
    setLoc(res);
    setLocation({ lat, lng });
    console.log(res);
  }
  const [showMap, setShowMap] = useState(false);
  const [Loc, setLoc] = useState("Not set");
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPSKEY, // ,
    // ...otherOptions
  });
  if (isLoaded)
    return (
      <>
        <p>
          Location : {Loc} {JSON.stringify(location)}
        </p>

        {/* {!showMap && (
          // <button onClick={() => setShowMap(!showMap)}>change</button>
        )} */}
        {showMap ? (
          <>
            {" "}
            <GoogleMap
              id="marker-example"
              mapContainerStyle={mapContainerStyle}
              center={begin}
              zoom={17}
              onLoad={(map) => {
                setMap(map);
                console.log(map.getZoom());
              }}
            >
              <Marker
                // onLoad={onLoad}
                position={location}
                draggable={true}
                onDragEnd={(e) => {
                  setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                  getLoc(e.latLng.lat(), e.latLng.lng());
                }}
              />
            </GoogleMap>
            <br />
            <p>Confirm this location : {Loc} ?</p>
            <br />
          </>
        ) : (
          ""
        )}
        <button
          onClick={() => {
            begin = location;
            setShowMap(!showMap);
          }}
        >
          {showMap ? "Set" : "Change"}
        </button>
      </>
    );
}
