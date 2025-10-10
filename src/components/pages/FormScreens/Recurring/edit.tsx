import { AmountInput } from "@components/ui/AmountInput";
import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import ScrollView from "@components/ui/base/ScrollView";
import { DescriptionInput } from "@components/ui/DescriptionInput";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { INITIAL_RECURRENCE_TYPE } from "@components/ui/SelectRecurrenceButton";
import { CallToast } from "@lib/call-toast";
import { recurringStrategies } from "@lib/strategies";
import { Category, Kind, RecurringScreenInsert } from "@lib/types";
import { validateRecurringTransactionUpdateData } from "@lib/validations/updates/recurring_transaction";
import { initialDataBase } from "@pages/TransactionScreenDefaultData";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { TransactionRecurringCardRegister } from "./components/Card";

interface TransactionRecurringEditScreenProps {
  id: string;
  kind: Kind
}

const initialDataRecurring = {
  ...initialDataBase,
  recurrenceType: INITIAL_RECURRENCE_TYPE,
  startDate: new Date(),
  endDate: null
} satisfies RecurringScreenInsert

export function TransactionRecurringEditScreen({ id, kind }: TransactionRecurringEditScreenProps) {
  const [data, setData] = useState<RecurringScreenInsert>(initialDataRecurring)
  const [lastData, setLastData] = useState<RecurringScreenInsert>()
  const navigation = useNavigation();

  useEffect(() => {
    recurringStrategies[kind].fetchById(id).then((fetchData) => {
      if (fetchData !== undefined) {
        const data: RecurringScreenInsert = {
          amountValue: fetchData.amountValue.toString(),
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
          recurrenceType: fetchData.recurrenceType,
          startDate: fetchData.startDate,
          endDate: fetchData.endDate
        }
        setData(data)
        setLastData(data)
      } else {
        Alert.alert("Erro", "ID inválido fornecido para edição.");
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

  const onConfirmCategory = useCallback((category: Category) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        category,
      }
    })
  }, [setData])

  const handleSubmit = useCallback((data: RecurringScreenInsert) => {
    if (data === undefined || lastData === undefined) return;
    const realData = {
      category: lastData.category.id === data.category.id ? undefined : data.category,
      description: lastData.description === data.description ? undefined : data.description,
      currentAmount: lastData.amountValue === data.amountValue ? undefined : data.amountValue,
    }
    const [hasError, errors] = validateRecurringTransactionUpdateData(data)
    if (hasError) {
      return Alert.alert("Atenção!", errors.join("\n"))
    }
    recurringStrategies[kind]
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

  const isNotReady = data === undefined || lastData === undefined

  if (isNotReady) {
    return null;
  }

  return (
    <BasePage style={styles.page}>
      <TransactionRecurringCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeDescription={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />

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