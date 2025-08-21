import { Text } from "react-native-paper";
import { DropdownSearchable } from "../DropdownSearchable";
import { useBankAccounts } from "./_context";

interface BankAccountDropdownProps {
  label: React.ComponentProps<typeof DropdownSearchable>["label"];
}

export function BankAccountDropdownSearchable({
  label
}: BankAccountDropdownProps) {
  const {
    items,
    choose,
    change_bank_account
  } = useBankAccounts()

  return (
    <DropdownSearchable
      label={label}
      options={items}
      choose={choose}
      onSelect={(selected) => {
        change_bank_account(selected)
      }}
      renderItem={(label) => (
        <Text>{label}</Text>
      )}
    />
  );
}