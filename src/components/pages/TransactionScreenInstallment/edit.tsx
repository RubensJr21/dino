import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import ScrollView from "@components/ui/base/ScrollView";
import { DescriptionInput } from "@components/ui/DescriptionInput";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { TransactionInstallmentCardRegister } from "@components/ui/TransactionCardRegister/TransactionInstallmentCardRegister";
import { installmentStrategies } from "@lib/strategies";
import { Category, InstallmentScreenInsert, Kind } from "@lib/types";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

interface TransactionInstallmentEditScreenProps {
  id: string;
  kind: Kind;
}

export function TransactionInstallmentEditScreen({ id, kind }: TransactionInstallmentEditScreenProps) {
  const [data, setData] = useState<InstallmentScreenInsert>()
  const [lastData, setLastData] = useState<InstallmentScreenInsert>()

  useEffect(() => {
    installmentStrategies[kind].fetchById(id).then((fetchData) => {
      if (fetchData !== undefined) {
        setData(fetchData)
        setLastData(fetchData)
      }
    })
  }, [id])

  const onChangeDescription = useCallback((text: string) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        description: text
      }
    })
  }, [setData])

  const onConfirmCategory = useCallback((category: Category) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        category,
      }
    })
  }, [setData])

  if (data === undefined || lastData === undefined) {
    // Quer dizer que o conteúdo ainda não foi inicializado ou carregado
    return null;
  }

  return (
    <BasePage style={styles.page}>
      <TransactionInstallmentCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeDescription={onChangeDescription} />

        <SelectCategoryButton
          category={data.category}
          onSelected={onConfirmCategory}
        />
      </ScrollView>
      <ButtonSubmit onSubmit={() => installmentStrategies[kind].update(id, {
        category: lastData.category.id === data.category.id ? undefined : data.category,
        description: lastData.description === data.description ? undefined : data.description,
      })} />
    </BasePage>
  )
}

const styles = StyleSheet.create({
  page: {
    rowGap: 0
  }
})