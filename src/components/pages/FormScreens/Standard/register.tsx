import { initialDataBase } from "@components/pages/TransactionScreenDefaultData";
import { AmountInput } from "@components/ui/AmountInput";
import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import { DatePickerButton } from "@components/ui/base/DatePickerButton";
import { DescriptionInput } from "@components/ui/DescriptionInput";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { INITIAL_TRANSACTION_INSTRUMENT, SelectTransactionInstrumentButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import { SelectTransferMethodButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransferMethodButton";
import * as ti_fns from "@data/playground/transaction_instrument";
import { CallToast } from "@lib/call-toast";
import { standardStrategies } from "@lib/strategies";
import { Category, Kind, StandardScreenInsert, TransactionInstrument } from "@lib/types";
import { validateStandardTransactionInsertData } from "@lib/validations/inserts/standard_transaction";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { TransactionStandardCardRegister } from "./components/Card";

type Props = {
  kind: Kind;
}

const initialDataStandard = {
  ...initialDataBase,
  scheduledAt: new Date()
} satisfies StandardScreenInsert

export function TransactionStandardRegisterScreen({ kind }: Props) {
  const [data, setData] = useState<StandardScreenInsert>(initialDataStandard)
  const router = useRouter();

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

  const toShowTransactionInstrument = useMemo(() => {
    return (data.transactionInstrument.transfer_method_code !== INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code)
  }, [data.transactionInstrument])

  const handleSubmit = useCallback((data: StandardScreenInsert) => {
    const [hasError, errors] = validateStandardTransactionInsertData(data)
    if (hasError) {
      return Alert.alert("Atenção!", errors.join("\n"))
    }
    standardStrategies[kind]
      .insert(data)
      .then(() => {
        CallToast("Transação registrada!")
        const timestamp = Date.now().toString();
        router.dismissAll();
        // Retorna para home passando o parâmetro de atualização
        router.replace({
          pathname: `/${kind}s/standard`,
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
      <TransactionStandardCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeDescription={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />
        <DatePickerButton date={data.scheduledAt} onDateConfirm={onConfirmDate} />

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