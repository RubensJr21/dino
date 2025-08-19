import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BankAccountApi from "@src/application/api/bank-account.api";
import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { TextBold } from "@src/application/components/Text/TextBold";
import InputBankName, { useRefInputBankName } from "@src/application/screens/Manage/BankAccounts/components/InputBankName";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import SelectionTransferMethods_V2 from "./components/SelectionTransferMethods";
import { BankAccountsStackParamList } from "./routes";

export interface EditParams {
  id: number;
  nickname: string;
}

type Props = NativeStackScreenProps<BankAccountsStackParamList, 'Edit'>;

export default function Edit({ route, navigation }: Props) {
  const {
    id,
    nickname,
  } = route.params
  
  let [selectionOfTransferMethods, setSelectionOfTransferMethods] = useState<Array<string>>([])

  useEffect(() => {
    BankAccountApi.list_all_transfers_methods_type({ id }).then((transfer_methods) => {
      if (transfer_methods === undefined) {
        Alert.alert(
          "'src/application/screens/Manage/BankAccounts/edit.tsx' diz:",
          "Não foi possível carregar os métodos de pagamento."
        )
        return;
      }

      setSelectionOfTransferMethods(
        transfer_methods
          .filter(ba_tm => !ba_tm.is_disabled)
          .map(ba_tm => ba_tm.transfer_method.method)
      )
    });

  }, [navigation, nickname]);

  const inputBankNameRef = useRefInputBankName(nickname);

  const handleButton = async (): Promise<BankAccount | undefined> => {
    const new_nickname = inputBankNameRef.bank_name.current;

    if (new_nickname === undefined || new_nickname === "") {
      Alert.alert("Por favor, preencha o campo de nome da conta.");
      return;
    }

    return BankAccountApi.edit({
      id,
      new_nickname,
      type_of_bank_transfers: selectionOfTransferMethods
    })
  };

  return (
    <BasePageView>
      <BasePageTitle style={styles.title_page}>
        Edição da conta: <TextBold>{nickname}</TextBold>
      </BasePageTitle>
      <ScrollView contentContainerStyle={styles.scroll_view_container}>
        <View style={styles.view_form}>
          <InputBankName refBankName={inputBankNameRef} />

          <SelectionTransferMethods_V2
            ref={(returned) => {
              if (returned !== null) {
                setSelectionOfTransferMethods(returned.selectionOfTransferMethods)
              }
            }}
            bank_id={id}
          />
        </View>
      </ScrollView>
      <SubmitButton variant="Edit" onPress={async () => {
        const result = await handleButton();

        if (result === undefined) {
          Alert.alert("Erro ao atualizar conta bancária.");
          return;
        }

        Alert.alert("Conta bancária atualizada com sucesso!");
        navigation.popTo("Home", {
          last_bank_account_modified: result.nickname
        });
      }} />
    </BasePageView>
  );
}

const styles = StyleSheet.create({
  title_page: {
    marginBottom: 0
  },
  scroll_view_container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  view_form: {
    flexGrow: 1,
    justifyContent: "flex-start",
    gap: 10,
    flexDirection: "column",
  },
});
