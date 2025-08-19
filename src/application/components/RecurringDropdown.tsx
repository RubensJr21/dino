import { recurrence_types_available, RecurrencesAvailable } from '@core/start_configs';
import { useNavigation } from '@react-navigation/native';
import { IRecurrenceType } from '@src/core/entities/recurrence_type.entity';
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert } from 'react-native';
import { Text } from 'react-native-paper';
import RecurrenceTypeApi from '../api/recurrence-type.api';
import { Dropdown } from './Dropdown';
import { DropdownTypeRef, Option, useRefDropdown } from './Dropdown/_context';

export interface RecurringDropdownTypeRef {
  value: React.MutableRefObject<RecurrencesAvailable>;
  changeType: (text: RecurrencesAvailable) => void;
}

export function useRefRecurringDropdown(initialValue: string) {
  return useRefDropdown<string>(initialValue)
}

interface RecurringDropdownProps {
  label: string;
  refRecurringDropdown: DropdownTypeRef<string>;
}

// Valor padrão. OBS: NÃO É UM ID VALIDO
export const RECURRENCE_DEFAULT_VALUE = {
  label: "",
  value: -1
} as const satisfies Option<IRecurrenceType["id"]>

interface RecurrenceTypeAvailableOptionType extends Option<IRecurrenceType["id"]> { }

const recurrencesAvailableKeys = Object.keys(recurrence_types_available)

function parseToCodeType(display_text: string) {
  for (const mode of recurrencesAvailableKeys) {
    if (recurrence_types_available[mode as RecurrencesAvailable].displayText === display_text) {
      return mode
    }
  }
  return `CODE_FOR_(${display_text})_NOT_FOUNDED`
}

export default function RecurringDropdown({ label, refRecurringDropdown }: RecurringDropdownProps) {
  const navigation = useNavigation()
  const [recurrencesAvailable, setRecurrenceTypeAvailable] = useState<Array<RecurrenceTypeAvailableOptionType>>([])
  const [recurrenceSelected, setRecurrenceSelected] = useState<Option<IRecurrenceType["id"]>>(RECURRENCE_DEFAULT_VALUE);

  useLayoutEffect(() => {
    RecurrenceTypeApi.list_all().then(recurrences => {
      if (recurrences === undefined) {
        Alert.alert(
          "Erro ocorreu ao carregar os bancos!",
          "Não foi possível carregar os bancos."
        )
        return;
      }
      if (recurrences.length === 0) {
        Alert.alert("Atenção!", "É necessário ter, pelo menos, uma recurrence cadastrada!")
        navigation.goBack()
        return;
      }

      const recurringOptions = recurrences.map(recurrence => ({
        // Garanto que é índice pois os dados foram inseridos durante a inicialização do app
        label: recurrence_types_available[recurrence.type as RecurrencesAvailable].displayText ?? "Recurrence not Founded",
        value: recurrence.id,
      }))

      setRecurrenceTypeAvailable(recurringOptions)

      const initialRecurrenceSelected = recurringOptions.find((option) => {
        return option.label === refRecurringDropdown.selected.current
      }) ?? recurringOptions[0]

      setRecurrenceSelected(initialRecurrenceSelected)
    })
  }, [])

  useEffect(() => {
    refRecurringDropdown.changeSelected(parseToCodeType(recurrenceSelected.label))
  }, [recurrenceSelected])

  // Significa que ainda não carregou o valor
  if (recurrencesAvailable.length === 0) {
    return null;
  }

  // Significa que ainda não carregou o valor
  if (recurrenceSelected.value === -1) {
    return null;
  }

  return (
    <Dropdown
      label={label}
      choose={recurrenceSelected}
      options={recurrencesAvailable}
      onSelect={(selected) => {
        setRecurrenceSelected(selected)
      }}
      renderItem={(label) => (
        <Text>{label}</Text>
      )}
    />
  );
}