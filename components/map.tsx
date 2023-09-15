import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import {
  GoogleMap,
  Marker,
  useLoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import { Github } from 'lucide-react'

import { AddressProps } from "@/app/interface/addressInterface";
import { getAddress } from "@/lib/getAddressData";
import { InsightProps } from "@/app/interface/insightInterface";
import { AddressCard } from "./address-card";
import { SelectedCard } from "./selected-card";
import RootLayout from "@/app/layout";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getAddressInsight } from "@/lib/getAddressInsight";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;


export default function Map() {
  // const [address, setAddress] = useState<LatLngLiteral>()
  const [addressData, setAddressData] = useState<AddressProps[]>([])
  const [insightData, setInsightData] = useState<InsightProps | ErrorProps>()
  const [selectedAddress, setSelectedAddress] = useState<string>('')

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

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  useEffect(() => {
    const getData = async () => {
      const response = await getAddress()
      setAddressData(response)
    }
    getData();
  }, []);

  const fetchLocation = (spot: LatLngLiteral) => {
    console.log('MARKER CLICK', spot);
  }

  const handleGithubInfo = () => {
    return window.location.href = 'https://github.com/maverickanp/solar-mapper'
  }

  const handleAddressInsight = async (latitude: string, longitude: string, address: string) => {
    const insight = await getAddressInsight(latitude, longitude)
    setInsightData(insight?.error ?? insight)
    setSelectedAddress(address);
    const position: LatLngLiteral = { lat: parseInt(latitude), lng: parseInt(longitude) }
    mapRef.current?.panTo(position);
  }

  return (
    <RootLayout>
      <div className='relative h-screen overflow-hidden'>
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <div className='flex items-center'>
            <Image
              src="/energia-solar.png"
              alt="solar Logo"
              width={40}
              height={40}
              priority
            />
            <h1 className='text-xl font-extrabold'>Solar Mapper</h1>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-sm text-muted-foreground'>area da direita</span>
            <Separator orientation='vertical' className='h-6' />
            <Button
              variant='outline'
              onClick={handleGithubInfo}
            >
              <Github className='w-4 h-4 mr-2' />
              Github
            </Button>
          </div>
        </div>

        <main className="flex-1 p-6 flex gap-6 h-[93%]">
          <div className='flex flex-col flex-1 rounded-xl border'>
            <div className='grid grid-rows-1 flex-1 bg-slate-200  min-w-[25rem]'>
              <GoogleMap
                zoom={10}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
              >
                <MarkerClusterer>
                  {(clusterer) =>
                    addressData?.map((spot) => (
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
                        label={spot.description}
                        onClick={() => {
                          fetchLocation(spot);
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>
              </GoogleMap>
            </div>
          </div>
          <aside className='flex-row bg-white w-80 rounded-xl'>
            <div className='flex-1 text-2xl bg-slate-200 overflow-y-auto rounded-xl h-[80%] p-2'>
              {addressData?.map((address: AddressProps) => {
                return (
                  <button key={address.uuid}
                    className='w-full'
                    onClick={() => { handleAddressInsight(address.latitude, address.longitude, address.description) }}
                  >
                    <AddressCard
                      data={address}
                      selected={address.description == selectedAddress}
                    />
                  </button>
                )
              })

              }
            </div>
            {/* Right side  with address list */}
            <div className=''>
              {selectedAddress && (
                <>
                  <SelectedCard
                    data={insightData}
                    address={selectedAddress}
                  />
                </>
              )}
            </div>
          </aside>
        </main>
      </div>
    </RootLayout>
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