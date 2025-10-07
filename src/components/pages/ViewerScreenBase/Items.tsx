import { amountParseToString } from "@components/ui/AmountInput";
import { ItemValueEntity } from "@lib/types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface ItemsProps {
  data: ItemValueEntity[];
  labelButton: string;
  colorButton: string;
}

export function Items({
  data,
  labelButton,
  colorButton
}: ItemsProps) {
  const theme = useTheme()
  return (
    <View style={{ rowGap: 5, paddingVertical: 5 }}>
      {
        data.map((item_value) => {
          return (
            <View key={item_value.id} style={[styles.item, { borderColor: theme.colors.backdrop, borderRadius: theme.roundness }]}>
              <Text variant="titleMedium" style={[styles.text, styles.flex_1]} >
                {item_value.scheduled_at.toLocaleDateString()}
              </Text>
              <Text variant="titleMedium" style={[styles.text]} >
                {amountParseToString(item_value.amount)}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  console.log("Informando que foi executado....")
                }}
                style={{
                  backgroundColor: colorButton,
                  borderRadius: theme.roundness,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 2
                }}
              >
                <Text variant="titleMedium" style={[styles.text]}>{labelButton}</Text>
              </TouchableOpacity>
            </View>
          )
        })
      }
    </View >
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    columnGap: 10,
    borderWidth: 2,
  },
  flex_1: {
    flex: 1
  },
  text: {
    textAlignVertical: "center"
  }
})