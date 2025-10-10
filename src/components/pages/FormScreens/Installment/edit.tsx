import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import ScrollView from "@components/ui/base/ScrollView";
import { DescriptionInput } from "@components/ui/DescriptionInput";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { CallToast } from "@lib/call-toast";
import { installmentStrategies } from "@lib/strategies";
import { Category, InstallmentScreenInsert, Kind } from "@lib/types";
import { validateInstallmentTransactionUpdateData } from "@lib/validations/updates/installment_transaction";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { TransactionInstallmentCardRegister } from "./components/Card";

interface TransactionInstallmentEditScreenProps {
  id: string;
  kind: Kind;
}

export function TransactionInstallmentEditScreen({ id, kind }: TransactionInstallmentEditScreenProps) {
  const [data, setData] = useState<InstallmentScreenInsert>()
  const [lastData, setLastData] = useState<InstallmentScreenInsert>()
  const navigation = useNavigation()

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

  const handleSubmit = useCallback((data: InstallmentScreenInsert) => {
    if (data === undefined || lastData === undefined) return;
    const realData = {
      category: lastData.category.id === data.category.id ? undefined : data.category,
      description: lastData.description === data.description ? undefined : data.description,
    }
    const [hasError, errors] = validateInstallmentTransactionUpdateData(data)
    if (hasError) {
      return Alert.alert("Atenção!", errors.join("\n"))
    }
    installmentStrategies[kind]
      .update(id, realData)
      .then(() => {
        CallToast("Transação atualizada!")
        navigation.goBack()
      })
      .catch((error) => {
        console.error(error)
        Alert.alert("Erro!", "Erro ao atualizar transação!")
      })
  }, [])

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
      <ButtonSubmit onSubmit={() => handleSubmit(data)} />
    </BasePage>
  )
}

const styles = StyleSheet.create({
  page: {
    rowGap: 0
  }
})