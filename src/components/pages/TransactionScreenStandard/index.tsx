import { standardStrategies } from "@lib/strategies";
import { Kind, StandardScreenEdit, StandardScreenInsert } from "@lib/types";
import { initialDataBase } from "../TransactionScreenBase";

import BasePage from "@components/ui/BasePage";
import { ButtonSubmit } from "@components/ui/ButtonSubmit";
import { DatePicker } from "@components/ui/ScreenBase/DatePicker";
import { DescriptionInput } from "@components/ui/ScreenBase/Description";
import ScrollView from "@components/ui/ScrollView";
import { SelectCategoryButton } from "@components/ui/SelectCategoryButton";
import { INITIAL_TRANSACTION_INSTRUMENT, SelectTransactionInstrumentButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransactionInstrumentButton";
import { SelectTransferMethodButton } from "@components/ui/SelectTransactionInstrumentOfTransferMethod/SelectTransferMethodButton";
import { TransactionStandardCardRegister } from "@components/ui/TransactionCardRegister/TransactionStandardCardRegister";
import { formatCurrencyString } from "@utils/formatCurrencyString";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

type TransactionStandardScreenProps = {
  id?: string;
  kind: Kind;
}

type TransactionStandardScreenState =
  | {
    isEditing: false;
    initialData: StandardScreenInsert;
    onSubmit: (data: StandardScreenInsert) => Promise<number>;
  }
  | {
    isEditing: true;
    initialData: StandardScreenEdit;
    onSubmit(data: StandardScreenEdit): Promise<void>;
  }

const initialDataStandard = {
  ...initialDataBase,
  scheduledAt: new Date()
} satisfies StandardScreenInsert

export function TransactionStandardScreen({ id, kind }: TransactionStandardScreenProps) {
  const [initialData, setInitialData] = useState<StandardScreenInsert>()

  useEffect(() => {
    if (id) {
      standardStrategies[kind].fetchById(id).then((fetchData) => {
        if (fetchData !== undefined) {
          setInitialData({
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
        }
      })
    } else {
      setInitialData(initialDataStandard)
    }
  }, [id])

  if (initialData === undefined) {
    // Quer dizer que o conteúdo ainda não foi inicializado ou carregado
    return null;
  }

  // return (
  //   <TransactionScreenBase<StandardScreenInsert>
  //     initialData={initialData}
  //     onSubmit={standardStrategies[kind].insert}
  //     CardElement={TransactionStandardCardRegister}
  //     renderExtras={(data, setInitialData) => (
  //       <DatePicker
  //         label="Selecionar data"
  //         selectedLabel="Mudar data"
  //         date={data.scheduledAt}
  //         onDateConfirm={date => {
  //           setInitialData(prev => ({
  //             ...prev,
  //             scheduledAt: date
  //           }))
  //         }}
  //       />
  //     )}
  //   />
  // )

  const onChangeDescription = (text: string) => {
    setInitialData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        description: text
      }
    })
  }

  const handleTextCurrencyInput = useCallback((value: string) => {
    const valueFormatted = formatCurrencyString(value)

    setInitialData(prev => {
      if (prev === undefined) return prev
      return {
        ...prev,
        amountValue: valueFormatted
      }
    })
  }, [setInitialData])

  return (
    <BasePage style={styles.page}>
      <TransactionStandardCardRegister data={initialData} />
      <ScrollView contentContainerStyle={{ rowGap: 5 }}>
        <DescriptionInput description={initialData?.description} onChangeText={onChangeDescription} />

        <TextInput
          dense
          label="Valor"
          mode="outlined"
          placeholder="Valor"
          keyboardType="numeric"
          value={initialData.amountValue}
          style={{ marginVertical: 0, writingDirection: "rtl" }}
          onChangeText={handleTextCurrencyInput}
          inputMode="numeric"
          maxLength={21}
        />

        <DatePicker
          date={initialData.scheduledAt}
          onDateConfirm={date => {
            setInitialData(prev => {
              if (prev === undefined) return prev
              return {
                ...prev,
                scheduledAt: date
              }
            })
          }}
        />

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
        }}>
          <SelectCategoryButton
            style={{
              flexGrow: 1,          // ocupa o máximo possível
              flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
            }}
            categoryId={initialData.category.id}
            onSelected={(categoryId) => {
              setInitialData(prev => {
                if (prev === undefined) return prev
                return {
                  ...prev,
                  categoryId,
                }
              })
            }}
          />

          <SelectTransferMethodButton
            style={{
              flexGrow: 1,          // ocupa o máximo possível
              flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
            }}
            transferMethodCode={initialData.transactionInstrument.transfer_method_code}
            onSelected={(transferMethodCode) => {
              setInitialData(prev => {
                if (prev === undefined) return prev
                return {
                  ...prev,
                  transactionInstrument: {
                    ...prev.transactionInstrument,
                    transfer_method_code: transferMethodCode
                  }
                }
              })
            }}
          />

          {
            initialData.transactionInstrument.transfer_method_code !== INITIAL_TRANSACTION_INSTRUMENT.transfer_method_code ?
              <SelectTransactionInstrumentButton
                style={{
                  flexGrow: 1,          // ocupa o máximo possível
                  flexBasis: "45%",     // base de ~metade do espaço (2 por linha)
                }}
                transferMethod={initialData.transactionInstrument.transfer_method_code}
                transactionInstrumentSelected={initialData.transactionInstrument}
                onSelected={(transactionInstrumentSelected) => {
                  setInitialData(prev => {
                    if (prev === undefined) return prev
                    return {
                      ...prev,
                      transactionInstrumentSelected
                    }
                  })
                }}
                // Está abrindo pela primeira vez
                isOpen={initialData.transactionInstrument.nickname.length === 0}
              />
              :
              null
          }
        </View>
      </ScrollView>
      <ButtonSubmit onSubmit={() => standardStrategies[kind].insert(initialData)} />
    </BasePage>
  )
}

const styles = StyleSheet.create({
  page: {
    rowGap: 0
  }
})