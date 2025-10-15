import Button from "@components/ui/base/Button";
import { CustomModal } from "@components/ui/base/CustomModal";
import * as rt_fns from "@data/playground/recurrence_type";
import { RecurrenceType, RecurrenceTypeEntity } from "@lib/types";
import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";
import { getRecurrenceLabel } from "start_configs";

export const INITIAL_RECURRENCE_TYPE: RecurrenceType = {
  id: -1,
  code: ""
}

interface SelectRecurrenceButtonProps {
  recurrenceSelected: RecurrenceType
  onSelected: (recurrenceSelected: RecurrenceType) => void
  style?: React.ComponentProps<typeof Button>["style"]
}

export function SelectRecurrenceButton({ recurrenceSelected, onSelected, style }: SelectRecurrenceButtonProps) {
  const theme = useTheme();

  const [data, setData] = useState<RecurrenceTypeEntity[]>()

  useEffect(() => {
    rt_fns.find_all().then(recurrence_types => setData(recurrence_types))
  }, [])

  const [open, setOpen] = useState(false)
  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  const [selection, setSelection] = useState(recurrenceSelected ?? INITIAL_RECURRENCE_TYPE)
  useEffect(() => {
    onSelected(selection)
  }, [selection])

  return (
    <>
      <Button style={style} onPress={show_modal}>
        {selection.id === -1 ? "Selecionar recorrência" : `Mudar recorrência`}
      </Button>
      <CustomModal
        isOpen={open}
        dismiss_modal={dismiss_modal}
        title="Selecione uma recorrência"
      >
        <FlatList
          data={data}
          style={{
            borderRadius: theme.roundness
          }}
          contentContainerStyle={{
            rowGap: 5,
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: theme.colors.backdrop,
          }}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item: recurrence_type }) => (
            <TouchableHighlight
              onPress={() => {
                setSelection(recurrence_type)
                dismiss_modal()
              }}
              style={{
                backgroundColor: theme.colors.inversePrimary,
                borderRadius: theme.roundness,
                paddingHorizontal: 8,
                paddingVertical: 16
              }}
              underlayColor={theme.colors.inverseOnSurface}
            >
              <Text>{getRecurrenceLabel(recurrence_type.code)}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}