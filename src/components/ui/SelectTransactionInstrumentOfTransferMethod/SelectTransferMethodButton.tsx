import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import { INITIAL_TRANSACTION_INSTRUMENT } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import { list_of_transfer_methods } from "@utils/factories/transfer_method.factory";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

interface SelectTransferMethodButtonProps {
  transferMethodCode?: string
  onSelected: (transferMethodCode: string) => void
  style?: React.ComponentProps<typeof Button>["style"]
}

export function SelectTransferMethodButton({ transferMethodCode, onSelected, style }: SelectTransferMethodButtonProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false)
  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  const [selection, setSelection] = useState(transferMethodCode ?? INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code)
  useEffect(() => {
    onSelected(selection)
  }, [selection])

  const data = useMemo(() => (
    Array.from(
      new Map(
        list_of_transfer_methods
          .map(transferMethod => [transferMethod.method, transferMethod])))
      .sort(([descA], [descB]) => descA.localeCompare(descB))
  ), [])

  return (
    <>
      <Button style={style} onPress={show_modal}>
        {selection === INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code ? "Selecionar método de transferência" : `Mudar método de transferência`}
      </Button>
      <CustomModal
        isOpen={open}
        dismiss_modal={dismiss_modal}
        title="Selecione um método de transferência"
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
          keyExtractor={([method, { id }]) => `${id}`}
          renderItem={({ item: [method] }) => (
            <TouchableHighlight
              onPress={() => {
                setSelection(method)
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
              <Text>{method}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}