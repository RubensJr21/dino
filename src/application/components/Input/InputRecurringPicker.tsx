import { recurrence_types_available, RecurrencesAvailable } from '@core/start_configs';
import { Picker } from '@react-native-picker/picker';
import { useRef, useState } from "react";
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export interface InputRecurringPickerTypeRef {
  value: React.MutableRefObject<RecurrencesAvailable>;
  changeType: (text: RecurrencesAvailable) => void;
}

export function useRefInputRecurringPicker(initialValue: RecurrencesAvailable): InputRecurringPickerTypeRef {
  const ref = useRef<RecurrencesAvailable>(initialValue);
  const changeType = (text: RecurrencesAvailable) => ref.current = text;
  return {
    value: ref,
    changeType,
  };
}

interface InputRecurringPickerProps {
  label: string;
  refRecurring: InputRecurringPickerTypeRef;
}
export default function InputRecurringPicker({ label, refRecurring }: InputRecurringPickerProps) {
  const theme = useTheme();
  const [selectedRecurrence, setSelectedRecurrence] = useState<RecurrencesAvailable>(refRecurring.value.current);

  return (
    <>
      <Text
        children={label}
        style={styles.label}
        variant="titleMedium" />
      <Picker
        style={{
          color: theme.colors.onSurface,
          backgroundColor: theme.colors.elevation.level4,
        }}
        dropdownIconColor={theme.colors.onSurface}
        selectedValue={selectedRecurrence}
        onValueChange={(itemValue, itemIndex) => {
          refRecurring.changeType(itemValue);
          setSelectedRecurrence(itemValue);
        }}>
        {Object.entries(recurrence_types_available).map(([key, { displayText }]) => (
          <Picker.Item key={key} label={displayText} value={key} />
        ))}
      </Picker>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    textAlignVertical: "center"
  }
});