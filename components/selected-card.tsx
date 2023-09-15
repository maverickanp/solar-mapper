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

const handleSavings = () => {
  return `R$`
}


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
            Expected Savings: {handleSavings()}
          </p>
        </>        
      ) : <p className='text-sm text-red-500'>Erro: {data?.solarPotential !== undefined ? '' : message} </p>
      }
    </div>
  )
};
