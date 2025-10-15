import Button from "@components/ui/base/Button";
import { AndroidNativeProps, DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";

interface Props {
  date?: Date;
  onDateConfirm: (date: Date) => void;
  label?: string
  selectedLabel?: string
  style?: React.ComponentProps<typeof Button>["style"]
}

export function DatePickerButton({
  date: dateDefault,
  onDateConfirm,
  label = "Selecionar data",
  selectedLabel = "Mudar data",
  style
}: Props) {
  const [date, setDate] = useState<Date | undefined>(dateDefault);

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

  const showMode = (currentMode?: AndroidNativeProps["mode"]) => {
    const today = new Date()
    DateTimePickerAndroid.open({
      value: date ?? today,
      onChange,
      mode: currentMode,
      is24Hour: true,
      timeZoneName: "America/Sao_Paulo",
      minimumDate: new Date(today.getFullYear(), today.getMonth()+1, 1)
    });
  };

  return (
    <Button style={style} onPress={() => showMode("date")}>
      {date === undefined ? label : selectedLabel}
    </Button>
  )
}