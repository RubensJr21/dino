import { Dropdown } from '@app-components/Dropdown';
import { Text } from "react-native-paper";
import { useTransferMethods } from "./_context";

interface TransferMethodDropdownOfBankProps {
  label: string;
}

export function TransferMethodDropdownOfBank({
  label
}: TransferMethodDropdownOfBankProps) {
  const {
    items,
    choose,
    change_transfer_method
  } = useTransferMethods();

  // if (items.length === 0) {
  //   return;
  // }

  return (
    <Dropdown
      label={label}
      choose={choose}
      options={items}
      onSelect={(selected) => {
        change_transfer_method(selected)
      }}
      renderItem={(label) => (
        <Text>{label}</Text>
      )}
    />
  );
}