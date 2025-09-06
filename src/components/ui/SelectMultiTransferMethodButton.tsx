import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import ScrollView from "@components/ui/ScrollView";
import { list_of_transfer_methods } from "@utils/factories/transfer_method.factory";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Chip, Text, useTheme } from "react-native-paper";

interface SelectMultiTransferMethodButtonProps {
  transferMethodsSelected: Array<string>
  onSelected: (transferMethodsSelected: Array<string>) => void
  style?: React.ComponentProps<typeof Button>["style"]
}

export function SelectMultiTransferMethodButton({ transferMethodsSelected, onSelected, style }: SelectMultiTransferMethodButtonProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false)
  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  const [selection, setSelection] = useState<Array<string>>(transferMethodsSelected)
  useEffect(() => {
    onSelected(Array.from(selection))
  }, [selection])

  const data = useMemo(() => (
    list_of_transfer_methods
  ), [])

  return (
    <>
      <Button style={style} onPress={show_modal}>
        {selection.length === 0 ? "Selecionar método de transferência" : `Mudar método de transferência`}
      </Button>
      <ScrollView
        // horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 5, flexDirection: "row", flexWrap: "wrap" }}
      >
        {
          transferMethodsSelected.map((transferMethod, index) => (
            <Chip
              key={index}
              style={{ backgroundColor: theme.colors.inversePrimary }}
              textStyle={{ textAlign: "center" }}
            >
              {transferMethod}
            </Chip>
          ))
        }
      </ScrollView>
      <CustomModal
        isOpen={open}
        dismiss_modal={dismiss_modal}
        title="Selecione um método de transferência"
      >
        <FlatList
          data={data}
          style={{
            borderRadius: theme.roundness,
            backgroundColor: theme.colors.backdrop,
          }}
          contentContainerStyle={{
            rowGap: 5,
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item: { method } }) => (
            <TouchableHighlight
              onPress={() => {
                setSelection(prev => {
                  if (prev.indexOf(method) !== -1) {
                    return prev.filter(item => item !== method)
                  }
                  return [
                    ...prev,
                    method
                  ]
                })
              }}
              style={{
                backgroundColor: selection.indexOf(method) !== -1 ? theme.colors.inversePrimary : theme.colors.outlineVariant,
                borderRadius: theme.roundness,
                paddingHorizontal: 8,
                paddingVertical: 16
              }}
              underlayColor={theme.colors.inverseOnSurface}
            >
              <Text>{method}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
        <Button onPress={dismiss_modal}>
          Ok
        </Button>
      </CustomModal>
    </>
  )
}