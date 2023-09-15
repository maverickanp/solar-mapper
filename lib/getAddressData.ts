export const getAddress = async () => {
  const query = await fetch(process.env.NEXT_PUBLIC_SOLARPIPE_ADDRESSES || 'https://challenge.solarpipe.com.br/addresses');
  
  if(!query.ok){
    throw new Error('failed to fetch data')
  }
  
  const response = await query.json();
  return response;
}