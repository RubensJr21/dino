import BasePage from "@components/ui/BasePage"
import { ButtonSubmit } from "@components/ui/ButtonSubmit"
import ScrollView from "@components/ui/ScrollView"
import { SelectTagButton } from "@components/ui/SelectTagButton"
import { SelectBankButton } from "@components/ui/SelectTransferMethodOfBank/SelectBankButton"
import { INITIAL_TRANSFER_METHOD, SelectTransferMethodButton } from "@components/ui/SelectTransferMethodOfBank/SelectTransferMethodButton"
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

export const initialDataBase = {
  description: "",
  amountValue: "0,00",
  tagSelected: "",
  bankSelected: "",
  transferMethodSelected: INITIAL_TRANSFER_METHOD
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
          <SelectTagButton
            style={{
              flexGrow: 1,          // ocupa o máximo possível
              flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
            }}
            tagSelected={data.tagSelected}
            onSelected={(tagSelected) => {
              setData(prev => ({
                ...prev,
                tagSelected,
              }))
            }}
          />
          <SelectBankButton
            style={{
              flexGrow: 1,          // ocupa o máximo possível
              flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
            }}
            bankSelected={data.bankSelected}
            onSelected={(bankSelected) => {
              setData(prev => ({
                ...prev,
                bankSelected,
              }))
            }}
          />

          {
            data.bankSelected !== "" ?
              <SelectTransferMethodButton
                style={{
                  flexGrow: 1,          // ocupa o máximo possível
                  flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
                }}
                bankSelected={data.bankSelected}
                transferMethodSelected={data.transferMethodSelected}
                onSelected={(transferMethodSelected) => {
                  setData(prev => ({
                    ...prev,
                    transferMethodSelected
                  }))
                }}
                // Está abrindo pela primeira vez
                isOpen={data.transferMethodSelected.label.length === 0}
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