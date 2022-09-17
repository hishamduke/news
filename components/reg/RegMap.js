import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { cordToStreet } from "../../lib/cordToStreet";
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

let begin = {
  lat: 11.472477361674866,
  lng: 75.85618379408506,
};
export default function RegMap(val) {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(begin);
  const [showMap, setShowMap] = useState(false);
  const [Loc, setLoc] = useState("Not set");
  async function getLoc(lat, lng) {
    setLoc("Loading");
    console.log(map.zoom);
    const res = await cordToStreet(lat, lng);
    setLoc(res);
    // setLocation({ lat, lng });
    console.log(res);
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPSKEY, // ,
    // ...otherOptions
  });
  if (isLoaded)
    return (
      <div style={{ width: "500px", minHeight: "300px" }}>
        <>
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                //   backgroundColor: "red",
                alignContent: "center",
              }}
            >
              <p
                style={{
                  // marginLeft: "10%",
                  fontSize: "medium",
                  // backgroundColor: "red",
                  width: "fit-content",
                  alignSelf: "center",
                  // backgroundColor: "red",
                }}
                className="zoom"
                onClick={() => {
                  val.setvis(false);
                }}
              >
                {<BiArrowBack />} back
              </p>
            </div>
          </>

          {/* {!showMap && (
          // <button onClick={() => setShowMap(!showMap)}>change</button>
        )} */}

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
                val.setInp({
                  ...val.inp,
                  loc: { lat: location.lat, lng: location.lng },
                });
              }}
            />
          </GoogleMap>
          <br />
        </>
      </div>
    );
  return <div style={{ minWidth: "500px", height: "300px" }}></div>;
}
