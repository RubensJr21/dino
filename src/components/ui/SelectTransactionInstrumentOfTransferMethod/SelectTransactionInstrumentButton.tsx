import Button from "@components/ui/Button";
import { CustomModal } from "@components/ui/CustomModal";
import { TransactionInstrument } from "@lib/types";
import { useUpdateEffect } from "@utils/useUpdateEffect";
import React, { useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

type onSelectedType = (transactionInstrumentSelected: TransactionInstrument) => void

interface SelectTransactionInstrumentButtonProps {
  transferMethod: TransactionInstrument["transfer_method_code"];
  transactionInstrumentSelected: TransactionInstrument;
  onSelected: onSelectedType;
  isOpen?: boolean;
  style?: React.ComponentProps<typeof Button>["style"];
}

export const INITIAL_TRANSACTION_INSTRUMENT: TransactionInstrument = {
  id: -1,
  nickname: "",
  transfer_method_code: ""
}

export function SelectTransactionInstrumentButton({ transferMethod, transactionInstrumentSelected, onSelected, isOpen, style }: SelectTransactionInstrumentButtonProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(isOpen ?? false)
  const [selection, setSelection] = useState<TransactionInstrument>(transactionInstrumentSelected)


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
    setSelection(INITIAL_TRANSACTION_INSTRUMENT)
    show_modal()
  }, [transferMethod])

  // Simula função de chamada a api
  const data = useMemo<TransactionInstrument[]>(() => (
    [
      { id: 1, nickname: `TransactionInstrument 1`, transfer_method_code: transferMethod.toString() },
      { id: 2, nickname: `TransactionInstrument 2`, transfer_method_code: transferMethod.toString() },
      { id: 3, nickname: `TransactionInstrument 3`, transfer_method_code: transferMethod.toString() },
      { id: 4, nickname: `TransactionInstrument 4`, transfer_method_code: transferMethod.toString() },
      { id: 5, nickname: `TransactionInstrument 5`, transfer_method_code: transferMethod.toString() },
      { id: 6, nickname: `TransactionInstrument 6`, transfer_method_code: transferMethod.toString() },
      { id: 7, nickname: `TransactionInstrument 7`, transfer_method_code: transferMethod.toString() },
      { id: 8, nickname: `TransactionInstrument 8`, transfer_method_code: transferMethod.toString() },
    ]
  ), [transferMethod])

  return (
    <>
      <Button style={style} onPress={() => show_modal()}>
        {selection.nickname === "" ? "Selecionar método de transferência" : `Mudar método de transferência`}
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
              <Text>{item.nickname}</Text>
            </TouchableHighlight>
          )}
          ListEmptyComponent={<Text>Nenhum item encontrado.</Text>}
        />
      </CustomModal>
    </>
  )
}