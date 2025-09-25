import BasePage from "@components/ui/BasePage"
import { ButtonSubmit } from "@components/ui/ButtonSubmit"
import ScrollView from "@components/ui/ScrollView"
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton"
import { INITIAL_TRANSACTION_INSTRUMENT, SelectTransactionInstrumentButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton"
import { SelectTransferMethodButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransferMethodButton"
import { TransactionScreenBaseInsert } from "@lib/types"
import { formatCurrencyString } from "@utils/formatCurrencyString"
import { useCallback, useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-paper"

type TransactionScreenBaseProps<T> = {
  initialData: T;
  onSubmit: (data: T) => void;
  CardElement: React.ComponentType<{ data: T }>;
  renderExtras?: (data: T, setData: React.Dispatch<React.SetStateAction<T>>) => React.ReactNode;
}

export const INITIAL_DESCRIPTION = ""
export const INITIAL_AMOUNT_VALUE = "0,00"
export const INITIAL_CATEGORY = {
  id: -1,
  code: ""
}

export const initialDataBase = {
  description: INITIAL_DESCRIPTION,
  amountValue: INITIAL_AMOUNT_VALUE,
  category: INITIAL_CATEGORY,
  transactionInstrument: INITIAL_TRANSACTION_INSTRUMENT
} satisfies TransactionScreenBaseInsert

export function TransactionScreenBase<T extends TransactionScreenBaseInsert>({
  initialData,
  onSubmit,
  CardElement,
  renderExtras
}: TransactionScreenBaseProps<T>) {
  const [data, setData] = useState<T>(initialData)

  const handleTextCurrencyInput = useCallback((value: string) => {
    const valueFormatted = formatCurrencyString(value)

    setData(prev => ({
      ...prev,
      amountValue: valueFormatted
    }))
  }, [setData])

  return (
    <BasePage style={styles.page}>
      <CardElement data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <TextInput
          dense
          label="Insira uma descrição:"
          mode="outlined"
          placeholder="Escreva uma descrição..."
          value={data.description}
          style={{ marginVertical: 0 }}
          onChangeText={v =>
            setData(prev => ({
              ...prev,
              description: v
            }))
          }
        />

        <TextInput
          dense
          label="Valor"
          mode="outlined"
          placeholder="Valor"
          keyboardType="numeric"
          value={data.amountValue}
          style={{ marginVertical: 0, writingDirection: "rtl" }}
          onChangeText={handleTextCurrencyInput}
          inputMode="numeric"
          maxLength={21}
        />

        {renderExtras?.(data, setData)}

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
        }}>
          <SelectCategoryButton
            style={{
              flexGrow: 1,          // ocupa o máximo possível
              flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
            }}
            categoryId={data.category.id}
            onSelected={(categoryId) => {
              setData(prev => ({
                ...prev,
                categoryId,
              }))
            }}
          />

          <SelectTransferMethodButton
            style={{
              flexGrow: 1,          // ocupa o máximo possível
              flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
            }}
            transferMethodCode={data.transactionInstrument.transfer_method_code}
            onSelected={(transferMethodCode) => {
              setData(prev => ({
                ...prev,
                transactionInstrument: {
                  ...prev.transactionInstrument,
                  transfer_method_code: transferMethodCode
                }
              }))
            }}
          />

          {
            data.transactionInstrument.transfer_method_code !== INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code ?
              <SelectTransactionInstrumentButton
                style={{
                  flexGrow: 1,          // ocupa o máximo possível
                  flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
                }}
                transferMethod={data.transactionInstrument.transfer_method_code}
                transactionInstrumentSelected={data.transactionInstrument}
                onSelected={(transactionInstrumentSelected) => {
                  setData(prev => ({
                    ...prev,
                    transactionInstrumentSelected
                  }))
                }}
                // Está abrindo pela primeira vez
                isOpen={data.transactionInstrument.nickname.length === 0}
              />
              :
              null
          }

        </View>
      </ScrollView>
      <ButtonSubmit onSubmit={() => onSubmit(data)} />
    </BasePage>
  )
}

const styles = StyleSheet.create({
  page: {
    rowGap: 0
  }
})