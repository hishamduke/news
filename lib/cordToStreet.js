export async function cordToStreet(lat, lng) {
  let val;
  await fetch(
    "https://www.mapquestapi.com/geocoding/v1/reverse?key=G1moSFJkXvMTf7kCVqTOPMh1SxtvJaGi&location=" +
      lat +
      "%2C" +
      lng +
      "&outFormat=json&thumbMaps=false"
  )
    .then((response) => response.json())
    .then((responseJson) => {
      val = responseJson.results[0].locations[0].street;
    });
  return val;
}
