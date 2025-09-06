import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

interface SelectBankButtonProps {
  bankSelected?: string
  onSelected: (bankSelected: string) => void
  style?: React.ComponentProps<typeof Button>["style"]
}

export function SelectBankButton({ bankSelected, onSelected, style }: SelectBankButtonProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false)

  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  const [selection, setSelection] = useState(bankSelected ?? "")
  useEffect(() => {
    onSelected(selection)
  }, [selection])

  const [search, setSearch] = useState("")
  useEffect(() => {
    setSearch("")
  }, [open])

  const data = useMemo(() => (
    [
      { nome: "Bank 1" },
      { nome: "Bank 2" },
      { nome: "Bank 3" },
      { nome: "Bank 4" },
      { nome: "Bank 6" },
      { nome: "Bank 7" },
      { nome: "Bank 8" },
      { nome: "Bank 9" },
    ]
      .filter(({ nome }) => nome.includes(search))
  ), [search])

  return (
    <>
      <Button style={style} onPress={() => show_modal()}>
        {selection === "" ? "Selecionar banco" : `Mudar banco`}
      </Button>
      <CustomModal
        isOpen={open}
        dismiss_modal={dismiss_modal}
        title="Selecione um Banco"
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