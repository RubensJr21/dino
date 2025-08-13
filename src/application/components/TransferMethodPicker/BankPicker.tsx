import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useBankAccounts } from "./_context";

export function BankPicker() {
  const theme = useTheme();
  const {
    items,
    select_bank
  } = useBankAccounts()

  return (
    <View>
      <Picker
        style={{
          color: theme.colors.onSurface,
          backgroundColor: theme.colors.elevation.level4,
        }}
        dropdownIconColor={theme.colors.onSurface}
        onValueChange={(itemValue: number, itemIndex) => {
          select_bank(itemValue)
        }}
      >
        {
          items.map(({ id, label }) => (
            <Picker.Item key={id} label={label} value={id} />
          ))
        }
      </Picker>
    </View >
  )
}