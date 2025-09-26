import BasePage from "@components/ui/BasePage";
import { ButtonSubmit } from "@components/ui/ButtonSubmit";
import { AmountInput } from "@components/ui/ScreenBase/AmountInput";
import { ControlsView } from "@components/ui/ScreenBase/ControlsView";
import { DescriptionInput } from "@components/ui/ScreenBase/DescriptionInput";
import ScrollView from "@components/ui/ScrollView";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { INITIAL_RECURRENCE_TYPE } from "@components/ui/SelectRecurrenceButton";
import { TransactionRecurringCardRegister } from "@components/ui/TransactionCardRegister/TransactionRecurringCardRegister";
import { recurringStrategies } from "@lib/strategies";
import { Kind, RecurringScreenInsert } from "@lib/types";
import { initialDataBase } from "@pages/TransactionScreenBase";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

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

  useEffect(() => {
    recurringStrategies[kind].fetchById(id).then((fetchData) => {
      if (fetchData !== undefined) {
        const data: RecurringScreenInsert = {
          amountValue: fetchData.amountValue.toString(),
          transactionInstrument: {
            id: fetchData.transactionInstrument.id,
            nickname: fetchData.transactionInstrument.nickname,
            transfer_method_code: fetchData.transactionInstrument.transfer_method_code
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

  if (data === undefined || lastData === undefined) {
    // Quer dizer que o conteúdo ainda não foi inicializado ou carregado
    return null;
  }

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

  const onConfirmCategory = useCallback((categoryId: number) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        categoryId,
      }
    })
  }, [setData])

  return (
    <BasePage style={styles.page}>
      <TransactionRecurringCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeText={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />

        <ControlsView>
          <SelectCategoryButton
            style={styles.controls_item}
            categoryId={data.category.id}
            onSelected={onConfirmCategory}
          />
        </ControlsView>
      </ScrollView>
      <ButtonSubmit onSubmit={() => recurringStrategies[kind].update(id, {
        category: lastData.category.id === data.category.id ? undefined : data.category,
        description: lastData.description === data.description ? undefined : data.description,
        currentAmount: lastData.amountValue === data.amountValue ? undefined : data.amountValue,
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