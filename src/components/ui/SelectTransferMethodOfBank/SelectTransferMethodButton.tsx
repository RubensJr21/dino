import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

interface SelectTransferMethodButtonProps {
  bankSelected: string;
  transferMethodSelected?: string;
  onSelected: (transferMethodSelected: string) => void;
  isOpen?: boolean;
  style?: React.ComponentProps<typeof Button>["style"];
}

export function SelectTransferMethodButton({ bankSelected, transferMethodSelected, onSelected, isOpen, style }: SelectTransferMethodButtonProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(isOpen ?? false)
  const [selection, setSelection] = useState(transferMethodSelected ?? "")


  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  useEffect(() => {
    onSelected(selection)
  }, [selection])

  useEffect(() => {
    setSelection("")
    show_modal()
  }, [bankSelected])

  const data = useMemo(() => (
    [
      { nome: `${bankSelected} - TransferMethod 1` },
      { nome: `${bankSelected} - TransferMethod 2` },
      { nome: `${bankSelected} - TransferMethod 3` },
      { nome: `${bankSelected} - TransferMethod 4` },
      { nome: `${bankSelected} - TransferMethod 5` },
      { nome: `${bankSelected} - TransferMethod 6` },
      { nome: `${bankSelected} - TransferMethod 7` },
      { nome: `${bankSelected} - TransferMethod 8` },
    ]
  ), [bankSelected])

  return (
    <>
      <Button style={style} onPress={() => show_modal()}>
        {selection === "" ? "Selecionar método de transferência" : `Mudar método de transferência`}
      </Button>
      <CustomModal
        isOpen={open}
        dismiss_modal={dismiss_modal}
        title="Selecione um método de transferência"
      >
        <FlatList
          data={data}
          style={{ borderRadius: theme.roundness }}
          contentContainerStyle={{
            rowGap: 5,
            paddingVertical: 5,
            paddingHorizontal: 5,
            backgroundColor: theme.colors.backdrop,
          }}
          keyExtractor={({ nome }) => `${nome}`}
          renderItem={({ item: { nome } }) => (
            <TouchableHighlight
              onPress={() => {
                setSelection(nome)
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
              <Text>{nome}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}

const styles = StyleSheet.create({
  dropdownBox: {
    minHeight: 400,
    maxHeight: 400,
    overflow: "hidden",
    rowGap: 5,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
})