import BasePage from "@components/ui/BasePage"
import { ButtonSubmit } from "@components/ui/ButtonSubmit"
import DatePickerSingle from "@components/ui/DatePickerSingle"
import Dropdown from "@components/ui/Dropdown"
import KeyboardAvoidingScrollView from "@components/ui/KeyboardAvoindingScrollView"
import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-paper"

type TransactionScreenBaseProps<T> = {
  id?: string
  initialData: T
  fetchById?: (id: string) => Promise<T>
  onInsert: (data: T) => void
  renderExtras?: (data: T, setData: React.Dispatch<React.SetStateAction<T>>) => React.ReactNode
}

interface InitialDataBase {
  description: string
  value: number
  date: string
}

export const initialDataBase = {
  description: "",
  value: 0,
  date: new Date().toISOString().split("T")[0] // Formato YYYY-MM-DD
} satisfies InitialDataBase

export function TransactionScreenBase<T extends InitialDataBase>({
  id,
  initialData,
  fetchById,
  onInsert,
  renderExtras
}: TransactionScreenBaseProps<T>) {
  const [data, setData] = useState<T>(initialData)

  useEffect(() => {
    if (id && fetchById) {
      fetchById(id).then(setData)
    }
  }, [id, fetchById])

  return (
    <BasePage style={styles.page}>
      <KeyboardAvoidingScrollView contentContainerStyle={{ rowGap: 5 }}>
        <TextInput
          label="Descrição"
          mode="outlined"
          placeholder="Descrição"
          value={data.description}
          onChangeText={v => setData({ ...data, description: v })}
          style={{ marginBottom: 5 }}
        />

        <DatePickerSingle
          onDateConfirm={(date) => {
            setData({
              ...data,
              date
            })
          }}
        />

        <TextInput
          label="Valor"
          mode="outlined"
          placeholder="Valor"
          keyboardType="numeric"
          value={data.value.toString()}
          onChangeText={v => setData({ ...data, value: Number(v) })}
          style={{ marginBottom: 0 }}
        />

        <TextInput
          label="Data"
          mode="outlined"
          placeholder="Data"
          value={data.date}
          onChangeText={v => setData({ ...data, date: v })}
          style={{ marginBottom: 0 }}
        />

        {renderExtras?.(data, setData)}

        <Dropdown>Dropdown da Tag</Dropdown>
        <Dropdown>Conjunto Dropdown do TransferMethod</Dropdown>
      </KeyboardAvoidingScrollView>

      <ButtonSubmit
        onInsert={() => onInsert(data)}
      />
    </BasePage>
  )
}

const styles = StyleSheet.create({
  page: {
    rowGap: 5
  }
})