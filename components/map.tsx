import { useState, useMemo, useCallback, useRef } from "react";

import {
  GoogleMap,
  Marker,
  useLoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import { AddressProps } from "@/app/interface/addressInterface";

interface MapProps {
  data: AddressProps[]
}

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;


export default function Map({ data }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -22.2265335, lng: -54.7937397 }),
    []
  );

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false
    }),
    []
  );

  const fetchLocation = (spot: LatLngLiteral) => {
    console.log('MARKER CLICK', spot);
  }


  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  // const spots = useMemo(() => generateRandomSpotsFromCenter(center), [center]);

  console.log('mapProps:', data);

  if (!isLoaded) return <div>Loading...</div>;
  return (
      <GoogleMap
        zoom={5}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        <MarkerClusterer>
          {(clusterer) =>
            data.map((spot) => (
              <Marker
                key={spot.uuid}
                position={
                  { 
                    lat: parseInt(spot.latitude), 
                    lng: parseInt(spot.longitude) 
                  }
                }
                title={spot.description}
                clusterer={clusterer}
                onClick={() => {
                  fetchLocation(spot);
                }}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
  );
}


const generateRandomSpotsFromCenter = (position: LatLngLiteral) => {
  const _spots: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _spots.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _spots;
};