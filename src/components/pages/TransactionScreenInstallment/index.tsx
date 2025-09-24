import SelectDateButton from "@components/ui/SelectDateButton";
import { TransactionInstallmentCardRegister } from "@components/ui/TransactionCardRegister/TransactionInstallmentCardRegister";
import { installmentStrategies } from "@lib/strategies";
import { InstallmentScreenInsert, Kind } from "@lib/types";
import { initialDataBase, TransactionScreenBase } from "@pages/TransactionScreenBase";
import { ButtonStepper } from "@pages/TransactionScreenInstallment/ButtonStepper";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

interface TransactionInstallmentScreenProps {
  id?: string;
  kind: Kind;
}

const DEFAULT_MIN_INSTALLMENT_NUMBER = 2
const DEFAULT_MIN_INSTALLMENT = `${DEFAULT_MIN_INSTALLMENT_NUMBER}`

const initialDataInstallment = {
  ...initialDataBase,
  startDate: new Date(),
  installments: DEFAULT_MIN_INSTALLMENT,
} satisfies InstallmentScreenInsert;

export function TransactionInstallmentScreen({ id, kind }: TransactionInstallmentScreenProps) {
  const [initialData, setInitialData] = useState<InstallmentScreenInsert>()
  const isEdit = id !== undefined

  useEffect(() => {
    if (id) {
      installmentStrategies[kind].fetchById(id).then((fetchData) => {
        if (fetchData !== undefined) {
          setInitialData(fetchData)
        }
      })
    } else {
      setInitialData(initialDataInstallment)
    }
  }, [id])

  if (initialData === undefined) {
    // Quer dizer que o conteúdo ainda não foi inicializado ou carregado
    return null;
  }

  return (
    <TransactionScreenBase<InstallmentScreenInsert>
      initialData={initialData}
      onSubmit={installmentStrategies[kind].insert}
      CardElement={TransactionInstallmentCardRegister}
      renderExtras={(data, setData) => {
        const decrement = useCallback(() => {
          setData(prev => {
            const updatedInstallment = Math.max(Number(prev.installments) - 1, DEFAULT_MIN_INSTALLMENT_NUMBER).toString()
            return {
              ...prev,
              installments: updatedInstallment
            }
          })

        }, [setData])

        const increment = useCallback(() => {
          setData(prev => {
            const updatedInstallment = (Number(prev.installments) + 1).toString()
            return {
              ...prev,
              installments: updatedInstallment
            }
          })
        }, [setData])

        return !isEdit && (
          <>
            <View style={{ flexDirection: "row", columnGap: 5 }}>
              <ButtonStepper iconName="minus" onPress={decrement} />
              <TextInput
                value={data.installments.toString()}
                onChangeText={(text: string) => {
                  const textOnlyNumbers = text.replaceAll(/\D/g, "")
                  setData(prev => ({
                    ...prev,
                    installments: textOnlyNumbers
                  }))
                }}
                onEndEditing={() => {
                  // aqui você valida depois que o usuário terminou
                  setData(prev => {
                    const installmentsNumber = Number(prev.installments)
                    const updatedInstallment = Math.max(installmentsNumber, DEFAULT_MIN_INSTALLMENT_NUMBER)
                    return {
                      ...prev,
                      installments: updatedInstallment.toString()
                    }
                  })
                }}
                style={styles.textInputValue}
                maxLength={6}
                contentStyle={{ textAlign: "center" }}
                inputMode="numeric"
                mode="outlined"
                dense
              />
              <ButtonStepper iconName="plus" onPress={increment} />
            </View>
            <SelectDateButton
              label="Selecionar data de início"
              selectedLabel="Mudar data de início"
              date={data.startDate}
              onDateConfirm={date => {
                setData(prev => ({
                  ...prev,
                  startDate: date
                }))
              }}
            />
          </>
        )
      }
      }
    />
  )
}

const styles = StyleSheet.create({
  textInputValue: {
    flex: 1
  }
})