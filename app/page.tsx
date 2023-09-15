'use client'
import Map from "@/components/map";
import { useLoadScript } from "@react-google-maps/api";
import { parseArgs } from "util";
import RootLayout from "./layout";


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map />
    </>
  )
}
