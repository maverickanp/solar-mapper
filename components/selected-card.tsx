import { InsightProps } from "@/app/interface/insightInterface";

type AddressInsightProps = {
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
            Max. panels capacity: {solarPotential.maxArrayPanelsCount}
          </p>
          <p className="text-sm font-normal">
            Generation Potential: {solarPotential.maxSunshineHoursPerYear}
          </p>
          <p className="text-sm font-normal">
            MaxArrayPanelsCount: {solarPotential.maxArrayPanelsCount}
          </p>
        </>        
      ) : <p className='text-sm text-red-500'>Erro: {data?.solarPotential !== undefined ? '' : message} </p>
      }
    </div>
  )
};
