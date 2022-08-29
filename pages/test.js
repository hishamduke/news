import React, { useState, useEffect } from "react";
import MapPicker from "react-google-map-picker";

const DefaultLocation = { lat: 11.14450170117654, lng: 75.96522120672375 };
const DefaultZoom = 10;

const Map = () => {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [addr, setAdddr] = useState();
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
    getLoc(lat, lng);
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  async function getLoc(lat, lng) {
    // console.log(lat + " " + lng);
    await fetch(
      "https://www.mapquestapi.com/geocoding/v1/reverse?key=G1moSFJkXvMTf7kCVqTOPMh1SxtvJaGi&location=" +
        lat +
        "%2C" +
        lng +
        "&outFormat=json&thumbMaps=false"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.results[0].locations[0]);
        setAdddr(responseJson.results[0].locations[0].street);
      });
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
    getLoc(DefaultLocation.lat, DefaultLocation.lng);
  }
  function showmap() {
    setShow(!show);
  }
  useEffect(() => {
    console.log(window);
    getLoc(location.lat, location.lng);
  }, []);
  return (
    <>
      <button onClick={handleResetLocation}>Reset Location</button>
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />
      {addr}

      <div id="mapDiv">
        <button onClick={showmap}>Set location</button>
        {JSON.stringify(show)}
      </div>
      {show ? (
        <MapPicker
          defaultLocation={defaultLocation}
          zoom={zoom}
          mapTypeId="roadmap"
          style={{ height: "700px" }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
        ></MapPicker>
      ) : null}
    </>
  );
};
Map.getLayout = function getLayout(page) {
  return (
    <div>
      <Map suppressHydrationWarning />
    </div>
  );
};
export default Map;
