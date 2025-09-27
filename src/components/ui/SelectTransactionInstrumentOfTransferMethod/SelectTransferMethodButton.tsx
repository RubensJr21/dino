import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import { INITIAL_TRANSACTION_INSTRUMENT } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import * as ti_fns from "@data/playground/transaction_instrument";
import { TransferMethodEntity } from "@lib/types";
import React, { useEffect, useState } from "react";
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

  const [data, setData] = useState<TransferMethodEntity[]>()

  useEffect(() => {
    ti_fns.find_all_used_transfer_methods().then(transfers_method => setData(transfers_method))
  }, [])

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
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item: method }) => (
            <TouchableHighlight
              onPress={() => {
                setSelection(method.code)
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
              <Text>{method.code}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}