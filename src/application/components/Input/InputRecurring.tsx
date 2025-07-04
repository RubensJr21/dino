import { recurrence_types_available, RecurrencesAvailable } from '@core/start_configs';
import { Picker } from '@react-native-picker/picker';
import { useRef, useState } from "react";
import { useTheme } from 'react-native-paper';

export interface InputRecurringTypeRef {
  value: React.MutableRefObject<RecurrencesAvailable>;
  changeType: (text: RecurrencesAvailable) => void;
}

export function useRefInputRecurring(initialValue: RecurrencesAvailable): InputRecurringTypeRef {
  const ref = useRef<RecurrencesAvailable>(initialValue);
  const changeType = (text: RecurrencesAvailable) => ref.current = text;
  return {
    value: ref,
    changeType,
  };
}

interface InputRecurringProps {
  refRecurring: InputRecurringTypeRef;
}
export default function InputRecurring({ refRecurring }: InputRecurringProps) {
  const theme = useTheme();
  const [selectedRecurrence, setSelectedRecurrence] = useState<RecurrencesAvailable>(refRecurring.value.current);

  return (
    <Picker
      style={{
        color: theme.colors.onSurface,
        backgroundColor: theme.colors.elevation.level4,
      }}
      dropdownIconColor={theme.colors.onSurface}
      selectedValue={selectedRecurrence}
      onValueChange={(itemValue, itemIndex) => {
        refRecurring.changeType(itemValue)
        setSelectedRecurrence(itemValue)
      }
      }>
      {Object.entries(recurrence_types_available).map(([key, {displayText}]) => (
        <Picker.Item key={key} label={displayText} value={key} />
      ))}
    </Picker>
  );
}