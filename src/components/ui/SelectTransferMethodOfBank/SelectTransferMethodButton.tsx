import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import { useUpdateEffect } from "@utils/useUpdateEffect";
import React, { useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

type transferMethodSelectedType = {
  id: number;
  label: string;
}

type onSelectedType = (transferMethodSelected: transferMethodSelectedType) => void

interface SelectTransferMethodButtonProps {
  bankSelected: string;
  transferMethodSelected: transferMethodSelectedType;
  onSelected: onSelectedType;
  isOpen?: boolean;
  style?: React.ComponentProps<typeof Button>["style"];
}

export const INITIAL_TRANSFER_METHOD = {
  id: -1,
  label: ""
} satisfies transferMethodSelectedType

export function SelectTransferMethodButton({ bankSelected, transferMethodSelected, onSelected, isOpen, style }: SelectTransferMethodButtonProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(isOpen ?? false)
  const [selection, setSelection] = useState<transferMethodSelectedType>(transferMethodSelected)


  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  useUpdateEffect(() => {
    onSelected(selection)
  }, [selection])

  useUpdateEffect(() => {
    setSelection(INITIAL_TRANSFER_METHOD)
    show_modal()
  }, [bankSelected])

  const data = useMemo(() => (
    [
      { id: 1, label: `${bankSelected} - TransferMethod 1` },
      { id: 2, label: `${bankSelected} - TransferMethod 2` },
      { id: 3, label: `${bankSelected} - TransferMethod 3` },
      { id: 4, label: `${bankSelected} - TransferMethod 4` },
      { id: 5, label: `${bankSelected} - TransferMethod 5` },
      { id: 6, label: `${bankSelected} - TransferMethod 6` },
      { id: 7, label: `${bankSelected} - TransferMethod 7` },
      { id: 8, label: `${bankSelected} - TransferMethod 8` },
    ]
  ), [bankSelected])

  return (
    <>
      <Button style={style} onPress={() => show_modal()}>
        {selection.label === "" ? "Selecionar método de transferência" : `Mudar método de transferência`}
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
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                setSelection(item)
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
              <Text>{item.label}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}