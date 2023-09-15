import { InsightProps } from "@/app/interface/insightInterface"
interface ErrorProps {
  code: number
  message: string
  status: string
}
interface AddressInsightProps  {
  data: InsightProps
  address: string
}



export const SelectedCard: React.FC<AddressInsightProps | ErrorProps > = ({data, address }) => {
  const {solarPotential} =  data!;
  const {message}: ErrorProps = data?.solarPotential === undefined  ? data : "";

  return (
    <div className='text-left mt-2'>
      <p className='text-lg font-bold'>{address}</p>
      {data?.solarPotential !== undefined ? (
        <>
          <p className="text-sm font-normal">
            Max. panels capacity: {solarPotential.maxArrayPanelsCount} units
          </p>
          <p className="text-sm font-normal">
            Generation Potential: {solarPotential.maxSunshineHoursPerYear}
          </p>
          <p className="text-sm font-normal">
            Solar Capacity: {solarPotential.panelCapacityWatts * solarPotential.maxArrayPanelsCount} kW
          </p>
        </>        
      ) : <p className='text-sm text-red-500'>Erro: {data?.solarPotential !== undefined ? '' : message} </p>
      }
    </div>
  )
};
