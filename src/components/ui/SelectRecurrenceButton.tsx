import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import { RecurrenceType } from "@lib/types";
import { list_of_recurrence_type } from "@utils/factories/recurrence_type.factory";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

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

  const data = useMemo(() => (
    Array.from(
      new Map(
        list_of_recurrence_type
          .map(recurrence => [recurrence.code, recurrence])))
      .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
  ), [])

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
          keyExtractor={([desc, { id }]) => `${id}`}
          renderItem={({ item: [desc, recurrence_type] }) => (
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
              <Text>{desc}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}