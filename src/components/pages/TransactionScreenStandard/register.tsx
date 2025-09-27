import BasePage from "@components/ui/BasePage";
import { ButtonSubmit } from "@components/ui/ButtonSubmit";
import { AmountInput } from "@components/ui/ScreenBase/AmountInput";
import { DatePicker } from "@components/ui/ScreenBase/DatePicker";
import { DescriptionInput } from "@components/ui/ScreenBase/DescriptionInput";
import ScrollView from "@components/ui/ScrollView";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { INITIAL_TRANSACTION_INSTRUMENT, SelectTransactionInstrumentButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import { SelectTransferMethodButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransferMethodButton";
import { TransactionStandardCardRegister } from "@components/ui/TransactionCardRegister/TransactionStandardCardRegister";
import { standardStrategies } from "@lib/strategies";
import { Category, Kind, StandardScreenInsert, TransactionInstrument } from "@lib/types";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { initialDataBase } from "../TransactionScreenDefaultData";

type Props = {
  kind: Kind;
}

const initialDataStandard = {
  ...initialDataBase,
  scheduledAt: new Date()
} satisfies StandardScreenInsert

export function TransactionStandardRegisterScreen({ kind }: Props) {
  const [data, setData] = useState<StandardScreenInsert>(initialDataStandard)

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

  const onConfirmTransferMethod = useCallback((transferMethodCode: string) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        transactionInstrument: {
          ...prev.transactionInstrument,
          transfer_method_code: transferMethodCode
        }
      }
    })
  }, [setData])

  const onConfirmTransactionInstrument = useCallback((transactionInstrument: TransactionInstrument) => {
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        transactionInstrument
      }
    })
  }, [setData])

  const toShowTransactionInstrument = useMemo(() => {
    return data.transactionInstrument.transfer_method_code !== INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code
  }, [data.transactionInstrument])

  return (
    <BasePage style={styles.page}>
      <TransactionStandardCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeText={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />
        <DatePicker date={data.scheduledAt} onDateConfirm={onConfirmDate} />

        <SelectCategoryButton
          category={data.category}
          onSelected={onConfirmCategory}
        />

        <SelectTransferMethodButton
          transferMethodCode={data.transactionInstrument.transfer_method_code}
          onSelected={onConfirmTransferMethod}
        />

        {
          toShowTransactionInstrument ?
            <SelectTransactionInstrumentButton
              transferMethod={data.transactionInstrument.transfer_method_code}
              transactionInstrumentSelected={data.transactionInstrument}
              onSelected={onConfirmTransactionInstrument}
              // Está abrindo pela primeira vez
              isOpen={data.transactionInstrument.nickname.length === 0}
            />
            :
            null
        }
      </ScrollView>
      <ButtonSubmit onSubmit={() => standardStrategies[kind].insert(data)} />
    </BasePage>
  )
}

const styles = StyleSheet.create({
  page: {
    rowGap: 0
  }
})