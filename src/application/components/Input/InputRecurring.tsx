import { Picker } from '@react-native-picker/picker';
import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { useRef, useState } from "react";
import { useTheme } from 'react-native-paper';

export interface InputRecurringTypeRef {
  value: React.MutableRefObject<RecurrenceType["type"]>;
  changeType: (text: RecurrenceType["type"]) => void;
}

// Puxar as informações de recorrência do banco de dados
const recurrings_type = [
  { label: "Semanalmente", value: "semanalmente" },
  { label: "Mensalmente", value: "mensalmente" },
  { label: "Anualmente", value: "anualmente" },
];

export function useRefInputRecurring(initialValue: RecurrenceType["type"]): InputRecurringTypeRef {
  const ref = useRef<RecurrenceType["type"]>(initialValue);
  const changeType = (text: RecurrenceType["type"]) => ref.current = text;
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
  const [selectedRecurrence, setSelectedRecurrence] = useState(refRecurring.value.current);

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
      {recurrings_type.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
}