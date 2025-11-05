import { AmountInput } from "@components/ui/AmountInput";
import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import { DatePickerButton } from "@components/ui/base/DatePickerButton";
import { DescriptionInput } from "@components/ui/DescriptionInput";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { INITIAL_RECURRENCE_TYPE, SelectRecurrenceButton } from "@components/ui/SelectRecurrenceButton";
import { INITIAL_TRANSACTION_INSTRUMENT, SelectTransactionInstrumentButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import { SelectTransferMethodButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransferMethodButton";
import * as ti_fns from "@data/playground/transaction_instrument";
import { CallToast } from "@lib/call-toast";
import { recurringStrategies } from "@lib/strategies";
import { Category, Kind, RecurrenceType, RecurringScreenInsert, TransactionInstrument } from "@lib/types";
import { validateRecurringTransactionInsertData } from "@lib/validations/inserts/recurring_transaction";
import { initialDataBase } from "@pages/TransactionScreenDefaultData";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { TransactionRecurringCardRegister } from "./components/Card";

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
  const router = useRouter()

  const onChangeDescription = useCallback((text: string) => {
    setData(prev => {
      return {
        ...prev,
        description: text
      }
    })
  }, [setData])

  const onChangeAmount = useCallback((amountText: string) => {
    setData(prev => {
      return {
        ...prev,
        amountValue: amountText
      }
    })
  }, [setData])

  const onConfirmDate = useCallback((date: Date) => {
    setData(prev => {
      return {
        ...prev,
        scheduledAt: date
      }
    })
  }, [setData])

  const onConfirmCategory = useCallback((category: Category) => {
    setData(prev => {
      return {
        ...prev,
        category,
      }
    })
  }, [setData])

  const onConfirmTransferMethod = useCallback(async (transferMethodCode: string) => {
    if (transferMethodCode === "cash") {
      return ti_fns.get_transaction_instrument_cash().then(list => {
        const transaction_instrument_cash = list.shift()
        if (transaction_instrument_cash === undefined) {
          throw new Error("Erro ao obter transaction_instrument_cash")
        }
        setData(prev => {
          return {
            ...prev,
            transactionInstrument: {
              id: transaction_instrument_cash.id,
              nickname: transaction_instrument_cash.nickname,
              transfer_method_code: transferMethodCode,
              bank_nickname: null
            }
          }
        })
      })
    }
    setData(prev => {
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

  const handleSubmit = useCallback((data: RecurringScreenInsert) => {
    const [hasError, errors] = validateRecurringTransactionInsertData(data)
    if (hasError) {
      return Alert.alert("Atenção!", errors.join("\n"))
    }
    recurringStrategies[kind]
      .insert(data)
      .then(() => {
        CallToast("Transação registrada!")
        const timestamp = Date.now().toString();
        router.dismissAll();
        // Retorna para home passando o parâmetro de atualização
        router.replace({
          pathname: `/${kind}s/recurring`,
          params: { update: timestamp }
        });
      })
      .catch((error) => {
        console.error(error)
        Alert.alert("Erro!", "Erro ao registrar transação!")
      })
  }, [])

  return (
    <BasePage style={styles.page}>
      <TransactionRecurringCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeDescription={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />
        <DatePickerButton date={data.startDate} onDateConfirm={onConfirmDate} />
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
      <ButtonSubmit onSubmit={() => handleSubmit(data)} />
    </BasePage>
  )
}

const styles = StyleSheet.create({
  page: {
    rowGap: 0
  }
})