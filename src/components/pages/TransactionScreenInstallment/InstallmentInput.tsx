import { ButtonStepper } from "@pages/TransactionScreenInstallment/ButtonStepper";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

export const DEFAULT_MIN_INSTALLMENT_NUMBER = 2
export const DEFAULT_MIN_INSTALLMENT = `${DEFAULT_MIN_INSTALLMENT_NUMBER}`

interface Props {
  installments: string;
  onEndEditing: (validated_installment: string) => void;
}

export function InstallmentInput({ installments, onEndEditing }: Props) {
  const [data, setData] = useState(installments ?? DEFAULT_MIN_INSTALLMENT)
  const decrement = useCallback(() => {
    setData(prev => {
      const updatedInstallment = Math.max(Number(prev) - 1, DEFAULT_MIN_INSTALLMENT_NUMBER)
      return updatedInstallment.toString()
    })

  }, [setData])

  const increment = useCallback(() => {
    setData(prev => ((Number(prev) + 1).toString()))
  }, [setData])

  return (
    <View style={{ flexDirection: "row", columnGap: 5 }}>
      <ButtonStepper iconName="minus" onPress={decrement} />
      <TextInput
        value={data.toString()}
        onChangeText={(text: string) => {
          const textOnlyNumbers = text.replaceAll(/\D/g, "")
          setData(textOnlyNumbers)
        }}
        onEndEditing={() => {
          // aqui você valida depois que o usuário terminou
          setData(prev => {
            const installmentsNumber = Number(prev)
            const maxInstallment = Math.max(installmentsNumber, DEFAULT_MIN_INSTALLMENT_NUMBER)
            const updatedInstallment = maxInstallment.toString()
            onEndEditing(updatedInstallment)
            return updatedInstallment
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
  )
}

const styles = StyleSheet.create({
  textInputValue: {
    flex: 1
  }
})