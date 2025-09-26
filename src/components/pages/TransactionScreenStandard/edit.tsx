import BasePage from "@components/ui/BasePage";
import { ButtonSubmit } from "@components/ui/ButtonSubmit";
import { AmountInput } from "@components/ui/ScreenBase/AmountInput";
import { ControlsView } from "@components/ui/ScreenBase/ControlsView";
import { DatePicker } from "@components/ui/ScreenBase/DatePicker";
import { DescriptionInput } from "@components/ui/ScreenBase/DescriptionInput";
import ScrollView from "@components/ui/ScrollView";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { TransactionStandardCardRegister } from "@components/ui/TransactionCardRegister/TransactionStandardCardRegister";
import { standardStrategies } from "@lib/strategies";
import { Kind, StandardScreenInsert } from "@lib/types";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

type Props = {
  id: string;
  kind: Kind;
}

export function TransactionStandardEditScreen({ id, kind }: Props) {
  const [data, setData] = useState<StandardScreenInsert>()

  useEffect(() => {
    standardStrategies[kind].fetchById(id).then((fetchData) => {
      if (fetchData !== undefined) {
        setData({
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
          scheduledAt: new Date(fetchData.scheduledAt)
        })
      } else {
        Alert.alert("Erro", "ID inválido fornecido para edição.");
      }
    })
  }, [id])

  if (data === undefined) {
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

  const onConfirmDate = useCallback((date: Date) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        scheduledAt: date
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
      <TransactionStandardCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeText={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />
        <DatePicker date={data.scheduledAt} onDateConfirm={onConfirmDate} />

        <ControlsView>
          <SelectCategoryButton
            style={styles.controls_item}
            categoryId={data.category.id}
            onSelected={onConfirmCategory}
          />
        </ControlsView>
      </ScrollView>
      <ButtonSubmit onSubmit={() => standardStrategies[kind].update(id, data)} />
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