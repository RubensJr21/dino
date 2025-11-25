import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  date?: Date;
  onDateConfirm: (date: Date) => void;
  label?: string;
  selectedLabel?: string
  style?: React.ComponentProps<typeof View>["style"]
}

export function DatePickerButton({
  date: dateDefault,
  onDateConfirm,
  label = "Selecionar data",
  selectedLabel = "Mudar data",
  style
}: Props) {
  const [date, setDate] = useState<Date | undefined>(dateDefault);
  const today = new Date();

  useEffect(() => {
    if (date !== undefined) {
      onDateConfirm(date)
    }
  }, [date])

  const onChange: AndroidNativeProps["onChange"] = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
  }

  return (
    <View style={[style, styles.container]}>
      <Text variant="titleMedium">{label}</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date ?? today}
        mode={"date"}
        is24Hour={true}
        timeZoneName="America/Sao_Paulo"
        minimumDate={new Date(today.getFullYear(), today.getMonth(), 1)}
        onChange={onChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
})