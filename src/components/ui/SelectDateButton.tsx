import Button from "@components/ui/Button";
import { AndroidNativeProps, DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";

interface Props {
  date?: Date;
  onDateConfirm: (date: Date) => void;
  label: string
  selectedLabel: string
  style?: React.ComponentProps<typeof Button>["style"]
}

export default function SelectDateButton({ date: dateDefault, onDateConfirm, label, selectedLabel, style }: Props) {
  const [date, setDate] = useState<Date | undefined>(dateDefault);

  useEffect(() => {
    if (date !== undefined) {
      onDateConfirm(date)
    }
  }, [date])

  const onChange: AndroidNativeProps["onChange"] = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }

  const showMode = (currentMode?: AndroidNativeProps["mode"]) => {
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
      timeZoneName: "America/Sao_Paulo",
    });
  };

  return (
    <Button style={style} onPress={() => showMode("date")}>
      {date === undefined ? label : selectedLabel}
    </Button>
  )
}