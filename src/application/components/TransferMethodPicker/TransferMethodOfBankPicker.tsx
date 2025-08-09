import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export function TransferMethodOfBankPicker() {
  const theme = useTheme();
  return (
    <View>
      <Picker
        style={{
          color: theme.colors.onSurface,
          backgroundColor: theme.colors.elevation.level4,
        }}
        dropdownIconColor={theme.colors.onSurface}
      >
        <Picker.Item label="TransferMethodOfBankPicker" value="Value_TransferMethodOfBankPicker"/>
      </Picker>
    </View>
  )
}