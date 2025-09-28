import Button from "@components/ui/base/Button";
import { CustomModal } from "@components/ui/base/CustomModal";
import * as ti_fns from "@data/playground/transaction_instrument";
import { TransactionInstrument, TransactionInstrumentEntity } from "@lib/types";
import { useUpdateEffect } from "@utils/useUpdateEffect";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, useTheme } from "react-native-paper";

type onSelectedType = (transactionInstrumentSelected: TransactionInstrument) => void

interface SelectTransactionInstrumentButtonProps {
  transferMethod: TransactionInstrument["transfer_method_code"];
  transactionInstrumentSelected: TransactionInstrument;
  onSelected: onSelectedType;
  style?: React.ComponentProps<typeof Button>["style"];
}

export const INITIAL_TRANSACTION_INSTRUMENT: TransactionInstrument = {
  id: -1,
  nickname: "",
  transfer_method_code: ""
}

export function SelectTransactionInstrumentButton({ transferMethod, transactionInstrumentSelected, onSelected, style }: SelectTransactionInstrumentButtonProps) {
  const theme = useTheme();

  const [data, setData] = useState<TransactionInstrumentEntity[]>()

  const isDisabled = useMemo(() => {
    return transferMethod === "cash"
  }, [transferMethod])

  useEffect(() => {
    if (isDisabled) {
      return;
    }
    ti_fns
      .find_all_enable_for_transfer_method(transferMethod)
      .then(transfer_methods => setData(transfer_methods))
      .catch((error) => { console.log(error) })
  }, [transferMethod, isDisabled])

  // Abri quando nenhum transaction_instrument tiver sido selecionado
  const [open, setOpen] = useState(transactionInstrumentSelected.nickname === INITIAL_TRANSACTION_INSTRUMENT.nickname)
  const [selection, setSelection] = useState<TransactionInstrument>(transactionInstrumentSelected)

  const show_modal = () => {
    setOpen(true)
  }
  const dismiss_modal = () => {
    setOpen(false)
  }

  useUpdateEffect(() => {
    if(isDisabled) return;
    onSelected(selection)
  }, [selection])

  useUpdateEffect(() => {
    if(isDisabled) return;
    setSelection({
      ...INITIAL_TRANSACTION_INSTRUMENT,
      transfer_method_code: transferMethod
    })
    show_modal()
  }, [transferMethod])

  return (
    <>
      <Button style={style} onPress={() => show_modal()} disabled={isDisabled}>
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