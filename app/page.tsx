'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import RootLayout from './layout'
import { Github } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { AddressCard } from '@/components/address-card'
import { AddressProps } from './interface/addressInterface'
import Map from '@/components/map'
import { SelectedCard } from '@/components/selected-card'
import Image from 'next/image'
import { InsightProps } from './interface/insightInterface'
import { getAddressInsight } from '@/lib/getAddressInsight'
import { getAddress } from '@/lib/getAddressData'
import { GoogleMap } from '@react-google-maps/api'
import Address from '@/components/address'

type LatLngLiteral = google.maps.LatLngLiteral;


export default function Home() {
  const [addressData, setAddressData] = useState<AddressProps[]>([])
  const [insightData, setInsightData] = useState<InsightProps | ErrorProps>()
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const mapRef = useRef<GoogleMap>();


  useEffect(() => {
    const getData = async () => {
      const response = await getAddress()
      setAddressData(response)
    }
    getData();
  }, []);

  const handleAddressInsight = async (latitude: string, longitude: string, address:string) => {
    const insight = await getAddressInsight(latitude,longitude)
    setInsightData(insight?.error?? insight)
    setSelectedAddress(address);
    const position:LatLngLiteral = {lat: parseInt(latitude), lng:parseInt(longitude)}
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
            <Button variant='outline'>
              <Github className='w-4 h-4 mr-2' />
              Github
            </Button>
          </div>
          {/* Left side with Google Map */}

        </div>

        <main className="flex-1 p-6 flex gap-6 h-[93%]">
          <div className='flex flex-col flex-1 rounded-xl border'>
            <div className='grid grid-rows-1 flex-1 bg-slate-200  min-w-[25rem]'>
              <Map data={addressData}  />
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
  )
}
