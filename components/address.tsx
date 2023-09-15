import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type AddressProps = {
  setAddress: (position: google.maps.LatLngLiteral) => void;
};

export default function Address({ setAddress }: AddressProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setAddress({ lat, lng });
  };

  return (
    <div>
      endereço:
      <input type="text" name="endereco"/>      
    </div>
  )

}
