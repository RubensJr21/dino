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
import * as ti_fns from "@data/playground/transaction_instrument";
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

  const toShowTransactionInstrument = useMemo(() => {
    return (
      data.transactionInstrument.transfer_method_code !== INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code
    )
  }, [data.transactionInstrument])


  const handleSubmit = () => {
    standardStrategies[kind].insert(data)
  }

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