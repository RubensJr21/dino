import BasePage from "@components/ui/base/BasePage";
import { ButtonSubmit } from "@components/ui/base/ButtonSubmit";
import { NicknameInput } from "@components/ui/NicknameInput";
import { SelectMultiTransferMethodButton } from "@components/ui/SelectMultiTransferMethodButton";
import * as ba_fns from "@data/playground/bank_account";
import { MCIcons } from "@lib/icons.lib";
import { validateBankAccountData } from "@lib/validations/bank_account";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "react-native-paper";

interface BankFormScreenEdit {
  id: number;
  nickname: string;
  transfer_methods_enable: Array<string>
}

export default function BankEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const theme = useTheme()
  const [data, setData] = useState<BankFormScreenEdit>()

  useEffect(() => {
    if (id) {
      ba_fns.find_by_id(id)
        .then((bank_account) => {
          if (bank_account === undefined) return;
          setData(bank_account)
        })
    }
  })

  if (!id) {
    <Redirect href={"/banks"} />
  }

  const onChangeNickname = useCallback((nickname: string) => {
    setData(prev => {
      if (prev === undefined) return prev;
      return {
        ...prev,
        nickname
      }
    })
  }, [setData])


  const onChangeMultiTransferMethod = useCallback((selection: string[]) => {
    setData(prev => {
      if (prev === undefined) return prev;
      return {
        ...prev,
        transfer_methods_enable: selection
      }
    })
  }, [])

  const handleSubmit = useCallback(() => {
    if (data === undefined) return;
    const [hasError, errors] = validateBankAccountData(data)
    if (hasError) {
      return Alert.alert("Atenção!", errors.join("\n"))
    }
  }, [data])

  if (data === undefined) {
    return null;
  }

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