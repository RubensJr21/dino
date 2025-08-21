import { Dropdown } from '@app-components/Dropdown';
import { Text } from "react-native-paper";
import { useTransferMethods } from "./_context";

interface TransferMethodDropdownOfBankProps {
  label: React.ComponentProps<typeof Dropdown>["label"];
}

export function TransferMethodDropdownOfBank({
  label
}: TransferMethodDropdownOfBankProps) {
  const {
    items,
    choose,
    change_transfer_method
  } = useTransferMethods();

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