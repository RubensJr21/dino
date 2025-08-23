import { useEffect, useState } from "react"
import { Button, TextInput, View } from "react-native"

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
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Descrição"
        value={data.description}
        onChangeText={v => setData({ ...data, description: v })}
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Valor"
        keyboardType="numeric"
        value={data.value.toString()}
        onChangeText={v => setData({ ...data, value: Number(v) })}
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Data"
        value={data.date}
        onChangeText={v => setData({ ...data, date: v })}
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />

      {renderExtras?.(data, setData)}

      <Button title="Salvar" onPress={() => onInsert(data)} />
    </View>
  )
}