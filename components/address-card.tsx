import { cn } from "@/lib/utils";

type AddressDataProps = {
  data: {
    state: string;
    city: string;
    streetName: string;
    description: string;
    neighbourhood: string;
    streetNumber: string;
    zipcode: string;
  }
  selected: boolean
}

export const AddressCard: React.FC<AddressDataProps> = ({
data,
selected
}) => {
  return (
    <div className={cn('text-left rounded-lg bg-slate-100 p-2 mb-2 cursor-pointer hover:bg-blue-300 hover:border-blue-600 border',
    selected ? 'border-blue-600 bg-blue-300' : ''
    )}>
      <p className='text-lg font-bold'>{data.description}</p>
      <p className="text-sm font-normal">
        {data.streetName}, {data.streetNumber}
      </p>
      <p className="text-sm font-normal">
        {data.neighbourhood}, {data.city} - {data.state}, {data.zipcode}
      </p>
      
    </div>
  )
};
