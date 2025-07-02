import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  useRef,
  useState
} from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { MdiNamesIcon } from "../ChooseIcon";

export interface InputDatePickerTypeRef {
  dateRef: React.MutableRefObject<Date>;
  changeDate: (date: Date) => void;
}

export function useRefInputDatePicker(initialValue: Date = new Date()): InputDatePickerTypeRef {
  const dateRef = useRef<Date>(initialValue);
  const changeDate = (date: Date) => dateRef.current = date;
  return {
    dateRef,
    changeDate,
  };
}

export interface InputDatePickerProps {
  label: string;
  refDatePicker: InputDatePickerTypeRef;
}

export default function InputDatePicker({ label, refDatePicker }: InputDatePickerProps) {
  const [inputDate, setInputDate] = useState<Date>(refDatePicker.dateRef.current);

  const onPressButtonDate = () => {
    DateTimePickerAndroid.open({
      timeZoneName: Intl.DateTimeFormat().resolvedOptions().timeZone,
      value: new Date(inputDate),
      onChange: (event: DateTimePickerEvent, date?: Date) => {
        if (event.type === "set" && date) {
          refDatePicker.changeDate(date);
          setInputDate(date);
        }
      },
      mode: "date",
      is24Hour: true,
    });
  }

  return (
    <>
      <Text variant="bodyLarge" style={styles.label}>
        {label}
      </Text>

      <Button
        mode="contained"
        icon={"calendar" as MdiNamesIcon}
        labelStyle={styles.button_select_date_label}
        contentStyle={styles.button_select_date_content}
        onPress={onPressButtonDate}
        maxFontSizeMultiplier={2}
      >
        {inputDate.toLocaleDateString()}
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    padding: 4,
  },
  button_select_date_label: {
    fontSize: 22,
    paddingTop: 7.5,
  },
  button_select_date_content: {
    paddingVertical: 8,
    // verticalAlign: "middle",
    flexDirection: "row-reverse",
  }
})