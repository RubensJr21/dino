import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import { NicknameInput } from "@components/ui/NicknameInput";
import { SelectMultiTransferMethodButton } from "@components/ui/SelectMultiTransferMethodButton";
import { insert_bank_account } from "@data/playground/bank_account";
import { CallToast } from "@lib/call-toast";
import { MCIcons } from "@lib/icons.lib";
import { validateBankAccountData } from "@lib/validations/bank_account";
import { useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "react-native-paper";

interface BankFormScreenInsert {
  nickname: string;
  transfer_methods_enable: Array<string>
}

const initialDataBank = {
  nickname: "",
  transfer_methods_enable: [] as Array<string>
} satisfies BankFormScreenInsert

export default function BankRegister() {
  const theme = useTheme()
  const [data, setData] = useState<BankFormScreenInsert>(initialDataBank)
  const navigation = useNavigation()

  const onChangeNickname = useCallback((nickname: string) => {
    setData(prev => {
      return {
        ...prev,
        nickname
      }
    })
  }, [setData])

  const onChangeMultiTransferMethod = useCallback((selection: string[]) => {
    setData(prev => ({
      ...prev,
      transfer_methods_enable: selection
    }))
  }, [])

  const handleSubmit = useCallback(() => {
    const [hasError, errors] = validateBankAccountData(data)
    if(hasError){
      return Alert.alert("Atenção!", errors.join("\n"))
    }
    insert_bank_account(data)
    .then(() => {
      CallToast("Conta bancária registrada!")
      navigation.goBack()
    })
    .catch(() => {
      Alert.alert("Erro!", "Erro ao registrar conta bancária!")
    })
  }, [data])

  return (
    <BasePage style={{ rowGap: 5 }}>
      <MCIcons
        style={{ textAlign: "center" }}
        name="bank-outline"
        color={theme.colors.primary}
        size={245}
      />

      <NicknameInput nickname={data.nickname} onChangeNickname={onChangeNickname} />

      <SelectMultiTransferMethodButton
        style={{ marginTop: 5 }}
        transferMethodsSelected={data.transfer_methods_enable}
        onSelected={onChangeMultiTransferMethod}
      />

      <ButtonSubmit onSubmit={handleSubmit} />
    </BasePage>
  )
}