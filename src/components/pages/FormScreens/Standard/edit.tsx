import { AmountInput } from "@components/ui/AmountInput";
import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import { DatePickerButton } from "@components/ui/base/DatePickerButton";
import { DescriptionInput } from "@components/ui/DescriptionInput";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { CallToast } from "@lib/call-toast";
import { standardStrategies } from "@lib/strategies";
import { Category, Kind, StandardScreenInsert } from "@lib/types";
import { validateStandardTransactionUpdateData } from "@lib/validations/updates/standard_transaction";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { TransactionStandardCardRegister } from "./components/Card";

type Props = {
  id: string;
  kind: Kind;
}

export function TransactionStandardEditScreen({ id, kind }: Props) {
  const [data, setData] = useState<StandardScreenInsert>()
  const [lastData, setLastData] = useState<StandardScreenInsert>()
  const router = useRouter()

  useEffect(() => {
    standardStrategies[kind].fetchById(id).then((fetchData) => {
      if (fetchData !== undefined) {
        const data = {
          amountValue: fetchData.amountValue,
          transactionInstrument: {
            id: fetchData.transactionInstrument.id,
            nickname: fetchData.transactionInstrument.nickname,
            transfer_method_code: fetchData.transactionInstrument.transfer_method_code,
            bank_nickname: fetchData.transactionInstrument.bank_nickname
          },
          category: {
            id: fetchData.category.id,
            code: fetchData.category.code
          },
          description: fetchData.description,
          scheduledAt: new Date(fetchData.scheduledAt)
        }
        setData(data)
        setLastData(data)
      } else {
        Alert.alert("Erro", "ID inválido fornecido para edição.");

        const timestamp = Date.now().toString();
        // Retorna para home passando o parâmetro de atualização
        router.replace({
          pathname: `/${kind}s/standard`,
          params: { update: timestamp }
        });
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

  const onChangeAmount = useCallback((amountText: string) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        amountValue: amountText
      }
    })
  }, [setData])

  const onConfirmDate = useCallback((date: Date) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        scheduledAt: date
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

  const handleSubmit = useCallback((data: StandardScreenInsert) => {
    if (lastData === undefined) return undefined;
    const realData = {
      amountValue: lastData.amountValue === data.amountValue ? undefined : data.amountValue,
      category: lastData.category.id === data.category.id ? undefined : data.category,
      description: lastData.description === data.description ? undefined : data.description,
      scheduledAt: lastData.scheduledAt === data.scheduledAt ? undefined : data.scheduledAt
    }

    const needUpdate = Object.values(realData).every(value => value === undefined)

    if (needUpdate) {
      Alert.alert("Atenção!", "Nenhum dado foi alterado!")
      return undefined;
    }

    const [hasError, errors] = validateStandardTransactionUpdateData(data)
    if (hasError) {
      return Alert.alert("Atenção!", errors.join("\n"))
    }

    standardStrategies[kind]
      .update(id, realData)
      .then(() => {
        CallToast("Transação atualizada!")
        const timestamp = Date.now().toString();
        // Retorna para home passando o parâmetro de atualização
        router.replace({
          pathname: `/${kind}s/standard`,
          params: { update: timestamp }
        });
      })
      .catch((error) => {
        console.error(error)
        Alert.alert("Erro!", "Erro ao atualizar transação!")
      })
  }, [lastData])

  const isNotReady = data === undefined || lastData === undefined

  if (isNotReady) {
    return null;
  }

  return (
    <BasePage style={styles.page}>
      <TransactionStandardCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeDescription={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />
        <DatePickerButton date={data.scheduledAt} onDateConfirm={onConfirmDate} />

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