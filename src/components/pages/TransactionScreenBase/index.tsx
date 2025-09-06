import BasePage from "@components/ui/BasePage"
import { ButtonSubmit } from "@components/ui/ButtonSubmit"
import ScrollView from "@components/ui/ScrollView"
import { SelectTagButton } from "@components/ui/SelectTagButton"
import { SelectBankButton } from "@components/ui/SelectTransferMethodOfBank/SelectBankButton"
import { SelectTransferMethodButton } from "@components/ui/SelectTransferMethodOfBank/SelectTransferMethodButton"
import { TransactionScreenBaseInsert } from "@lib/types"
import { useCallback, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-paper"

type TransactionScreenBaseProps<T> = {
  id?: string
  initialData: T
  fetchById?: (id: string) => Promise<T>
  onSubmit: (data: T) => void
  CardElement: React.ComponentType<{ data: T }>
  renderExtras?: (data: T, setData: React.Dispatch<React.SetStateAction<T>>) => React.ReactNode
}

export const initialDataBase = {
  description: "",
  amountValue: "0,00",
  tagSelected: "",
  bankSelected: "",
  transferMethodSelected: ""
} satisfies TransactionScreenBaseInsert

export function TransactionScreenBase<T extends TransactionScreenBaseInsert>({
  id,
  initialData,
  fetchById,
  onSubmit,
  CardElement,
  renderExtras
}: TransactionScreenBaseProps<T>) {
  const [data, setData] = useState<T>(initialData)

  useEffect(() => {
    if (id && fetchById) {
      fetchById(id).then((fetchData) => {
        if (fetchData !== undefined) {
          setData(fetchData)
        }
      })
    }
  }, [id, fetchById])

  const handleTextCurrencyInput = useCallback((value: string) => {
    const onlyNumbers = Number(value.replaceAll(/\D/g, "")) / 100

    const valueFormatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(onlyNumbers);
    
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
                isOpen
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