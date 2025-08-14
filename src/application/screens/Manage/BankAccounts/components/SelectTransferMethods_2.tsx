import { useState } from 'react';
import Dropdown from 'react-native-input-select';

export function SelectTransferMethods_V2() {
  const [country, setCountry] = useState<string[]>([]);
  return (<Dropdown
    label="Country"
    placeholder="Select an option..."
    options={[
      { label: 'Nigeria', value: 'NG' },
      { label: 'Åland Islands', value: 'AX' },
      { label: 'Algeria', value: 'DZ' },
      { label: 'American Samoa', value: 'AS' },
      { label: 'Andorra', value: 'AD' },
    ]}
    selectedValue={country}
    onValueChange={(value) => setCountry(value as string[])}
    primaryColor={'green'}
  />)
}