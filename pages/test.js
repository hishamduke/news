import React, { useState } from "react";

import MapPicker from "react-google-map-picker";

const DefaultLocation = { lat: 11.14450170117654, lng: 75.96522120672375 };
const DefaultZoom = 10;

const Map = () => {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [addr, setAdddr] = useState();

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
    getLoc();
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  async function getLoc() {
    console.log(location);
    await fetch(
      "https://www.mapquestapi.com/geocoding/v1/reverse?key=G1moSFJkXvMTf7kCVqTOPMh1SxtvJaGi&location=" +
        location.lat +
        "%2C" +
        location.lng +
        "&outFormat=json&thumbMaps=false"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setAdddr(responseJson);
      });
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
    getLoc();
  }

  return (
    <>
      <button onClick={handleResetLocation}>Reset Location</button>
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />
      {addr ? addr.results[0].locations[0].street : "hi"}
      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        // mapTypeId="roadmap"
        style={{ height: "700px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
      ></MapPicker>
    </>
  );
};
Map.getLayout = function getLayout(page) {
  return (
    <div>
      <Map />
    </div>
  );
};
export default Map;
