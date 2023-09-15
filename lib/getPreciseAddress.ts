import Geocode from "react-geocode";

export interface LatLng {
  lat: number
  lng: number
}

export const getPreciseAddress = async (address:string) => {
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '')
Geocode.setRegion('br')
Geocode.setLocationType("ROOFTOP");
// Get latitude & longitude from address.
let  getPreciseAddress: LatLng = {
  lat: 0,
  lng: 0
}

Geocode.fromAddress(address).then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    getPreciseAddress = { lat, lng }
  },
  (error) => {
    console.error(error);
  }
);

return getPreciseAddress;
}