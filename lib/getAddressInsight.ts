export const getAddressInsight = async (latitude:string, longitude:string) => {
  const query = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_API_BUILDING_INSIGHTS}?location.latitude=${latitude}&location.longitude=${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
  
  const response = await query.json();
  return response;
}