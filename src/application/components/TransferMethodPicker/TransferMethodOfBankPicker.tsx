import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useTransferMethods } from "./_context";

export function TransferMethodOfBankPicker() {
  const theme = useTheme();
  
  const {
    items,
    select_transfer_method
  } = useTransferMethods();

  return (
    <View>
      <Picker
        style={{
          color: theme.colors.onSurface,
          backgroundColor: theme.colors.elevation.level4,
        }}
        dropdownIconColor={theme.colors.onSurface}
        onValueChange={(itemValue: number, itemIndex) => {
          select_transfer_method(itemValue)
        }}
      >
        {
          items.map(({ id, label }) => (
            <Picker.Item key={id} label={label} value={id} />
          ))
        }
      </Picker>
    </View>
  )
}