import BasePage from "@components/ui/BasePage";
import { ButtonSubmit } from "@components/ui/ButtonSubmit";
import { AmountInput } from "@components/ui/ScreenBase/AmountInput";
import { DatePicker } from "@components/ui/ScreenBase/DatePicker";
import { DescriptionInput } from "@components/ui/ScreenBase/DescriptionInput";
import ScrollView from "@components/ui/ScrollView";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { INITIAL_RECURRENCE_TYPE, SelectRecurrenceButton } from "@components/ui/SelectRecurrenceButton";
import { INITIAL_TRANSACTION_INSTRUMENT, SelectTransactionInstrumentButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import { SelectTransferMethodButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransferMethodButton";
import { TransactionRecurringCardRegister } from "@components/ui/TransactionCardRegister/TransactionRecurringCardRegister";
import * as ti_fns from "@data/playground/transaction_instrument";
import { recurringStrategies } from "@lib/strategies";
import { Category, Kind, RecurrenceType, RecurringScreenInsert, TransactionInstrument } from "@lib/types";
import { initialDataBase } from "@pages/TransactionScreenDefaultData";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";

interface TransactionRecurringRegisterScreenProps {
  kind: Kind
}

const initialDataRecurring = {
  ...initialDataBase,
  recurrenceType: INITIAL_RECURRENCE_TYPE,
  startDate: new Date(),
  endDate: null
} satisfies RecurringScreenInsert

export function TransactionRecurringRegisterScreen({ kind }: TransactionRecurringRegisterScreenProps) {
  const [data, setData] = useState<RecurringScreenInsert>(initialDataRecurring)

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

  const onConfirmTransferMethod = useCallback(async (transferMethodCode: string) => {
    if (transferMethodCode === "cash") {
      ti_fns.get_transaction_instrument_cash().then(list => {
        const transaction_instrument_cash = list.shift()
        if (transaction_instrument_cash === undefined) {
          throw new Error("Erro ao obter transaction_instrument_cash")
        }
        setData(prev => {
          if (prev === undefined) return prev
          return {
            ...prev,
            transactionInstrument: {
              id: transaction_instrument_cash.id,
              nickname: transaction_instrument_cash.nickname,
              transfer_method_code: transferMethodCode
            }
          }
        })
      })
      return;
    }
    setData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        transactionInstrument: {
          ...INITIAL_TRANSACTION_INSTRUMENT,
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

  const onConfirmRecurrence = useCallback((recurrenceType: RecurrenceType) => {
    setData(prev => ({
      ...prev,
      recurrenceType
    }))
  }, [])

  const toShowTransactionInstrument = useMemo(() => {
    return (data.transactionInstrument.transfer_method_code !== INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code)
  }, [data.transactionInstrument])

  const handleSubmit = async () => {
    // Fazer validações
    recurringStrategies[kind].insert(data)
  }

  return (
    <BasePage style={styles.page}>
      <TransactionRecurringCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeText={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />
        <DatePicker date={data.startDate} onDateConfirm={onConfirmDate} />
        <SelectRecurrenceButton
          recurrenceSelected={data.recurrenceType}
          onSelected={onConfirmRecurrence}
        />

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
            />
            :
            null
        }
      </ScrollView>
      <ButtonSubmit onSubmit={handleSubmit} />
    </BasePage>
  )
}

const styles = StyleSheet.create({
  page: {
    rowGap: 0
  }
})