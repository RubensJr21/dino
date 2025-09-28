import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import { SelectMultiTransferMethodButton } from "@components/ui/SelectMultiTransferMethodButton";
import { MCIcons } from "@lib/icons.lib";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

interface BankFormScreenProps {
  id?: string;
}

interface BankFormScreenInsert {
  nickname: string;
  balance: string;
  transfer_methods_enable: Array<string>
}

const initialDataBank = {
  nickname: "",
  balance: "0,00",
  transfer_methods_enable: [] as Array<string>
} satisfies BankFormScreenInsert

export function BankFormScreen({ id }: BankFormScreenProps) {
  const theme = useTheme()
  const [data, setData] = useState<BankFormScreenInsert>(initialDataBank)
  const isEdit = id !== undefined

  useEffect(() => {
    if (id) {
      // irá mudar data
    }
  }, [id])

  const handleTextCurrencyInput = useCallback((value: string) => {
    const onlyNumbers = Number(value.replaceAll(/\D/g, "")) / 100

    const valueFormatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(onlyNumbers);

    setData(prev => ({
      ...prev,
      balance: valueFormatted
    }))
  }, [setData])

  const handleSubmit = () => {
    Alert.alert("Enviando dados do banco.")
  }

  return (
    <BasePage style={{ rowGap: 5 }}>
      <MCIcons
        style={{ textAlign: "center" }}
        name="bank-outline"
        color={theme.colors.primary}
        size={245}
      />

      <TextInput
        dense
        label="Insira um apelido para a conta bancária:"
        mode="outlined"
        placeholder="Ex: Conta do banco X..."
        value={data.nickname}
        onChangeText={v =>
          setData(prev => ({
            ...prev,
            nickname: v
          }))
        }
      />

      {
        !isEdit && (
          <TextInput
            dense
            label="Valor atual em conta:"
            mode="outlined"
            keyboardType="numeric"
            value={data.balance}
            style={{ marginVertical: 0, writingDirection: "rtl" }}
            onChangeText={handleTextCurrencyInput}
            inputMode="numeric"
            maxLength={21}
          />
        )
      }

      <SelectMultiTransferMethodButton
        style={{ marginTop: 5 }}
        transferMethodsSelected={data.transfer_methods_enable}
        onSelected={selection => {
          setData(prev => ({
            ...prev,
            transfer_methods_enable: selection
          }))
        }}
      />

      <ButtonSubmit onSubmit={handleSubmit} />
    </BasePage>
  )
}