import { AmountInput } from "@components/ui/AmountInput";
import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import { DatePickerButton } from "@components/ui/base/DatePickerButton";
import ScrollView from "@components/ui/base/ScrollView";
import { DescriptionInput } from "@components/ui/DescriptionInput";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { INITIAL_TRANSACTION_INSTRUMENT, SelectTransactionInstrumentButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import { SelectTransferMethodButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransferMethodButton";
import * as ti_fns from "@data/playground/transaction_instrument";
import { CallToast } from "@lib/call-toast";
import { installmentStrategies } from "@lib/strategies";
import { Category, InstallmentScreenInsert, Kind, TransactionInstrument } from "@lib/types";
import { validateInstallmentTransactionInsertData } from "@lib/validations/inserts/installment_transaction";
import { DEFAULT_MIN_INSTALLMENT, InstallmentInput } from "@pages/FormScreens/Installment/components/InstallmentInput";
import { initialDataBase } from "@pages/TransactionScreenDefaultData";
import { useNavigation } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { TransactionInstallmentCardRegister } from "./components/Card";

interface TransactionInstallmentRegisterScreenProps {
  kind: Kind;
}

const initialDataInstallment = {
  ...initialDataBase,
  startDate: new Date(),
  installments: DEFAULT_MIN_INSTALLMENT,
} satisfies InstallmentScreenInsert;

export function TransactionInstallmentRegisterScreen({ kind }: TransactionInstallmentRegisterScreenProps) {
  const [data, setData] = useState<InstallmentScreenInsert>(initialDataInstallment)
    const navigation = useNavigation()

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

  const onConfirmStartDate = useCallback((date: Date) => {
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
              bank_nickname: null,
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

  const onEndEditingInstallmentInput = useCallback((installments: string) => {
    setData(prev => ({
      ...prev,
      installments
    }))
  }, [setData])

  const handleSubmit = useCallback((data: InstallmentScreenInsert) => {
    const [hasError, errors] = validateInstallmentTransactionInsertData(data)
    if (hasError) {
      return Alert.alert("Atenção!", errors.join("\n"))
    }
    installmentStrategies[kind]
      .insert(data)
      .then(() => {
        CallToast("Transação registrada!")
        navigation.goBack()
      })
      .catch((error) => {
        console.error(error)
        Alert.alert("Erro!", "Erro ao registrar transação!")
      })
  }, [])

  const toShowTransactionInstrument = useMemo(() => {
    return (data.transactionInstrument.transfer_method_code !== INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code)
  }, [data.transactionInstrument])

  return (
    <BasePage style={styles.page}>
      <TransactionInstallmentCardRegister data={data} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={data.description} onChangeDescription={onChangeDescription} />
        <AmountInput amountValue={data.amountValue} onChangeAmount={onChangeAmount} />
        <InstallmentInput
          installments={data.installments}
          onEndEditing={onEndEditingInstallmentInput}
        />
        <DatePickerButton
          label="Selecionar data de início"
          selectedLabel="Mudar data de início"
          date={data.startDate}
          onDateConfirm={onConfirmStartDate}
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
        }s
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