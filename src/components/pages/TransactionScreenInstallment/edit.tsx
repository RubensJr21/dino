import BasePage from "@components/ui/BasePage";
import { ButtonSubmit } from "@components/ui/ButtonSubmit";
import { ControlsView } from "@components/ui/ScreenBase/ControlsView";
import { DescriptionInput } from "@components/ui/ScreenBase/DescriptionInput";
import ScrollView from "@components/ui/ScrollView";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { TransactionInstallmentCardRegister } from "@components/ui/TransactionCardRegister/TransactionInstallmentCardRegister";
import { installmentStrategies } from "@lib/strategies";
import { InstallmentScreenInsert, Kind } from "@lib/types";
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

  const onConfirmCategory = useCallback((categoryId: number) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        categoryId,
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
        <DescriptionInput description={data.description} onChangeText={onChangeDescription} />

        <ControlsView>
          <SelectCategoryButton
            style={styles.controls_item}
            categoryId={data.category.id}
            onSelected={onConfirmCategory}
          />
        </ControlsView>
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
  },
  controls_item: {
    flexGrow: 1,          // ocupa o máximo possível
    flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
  }
})