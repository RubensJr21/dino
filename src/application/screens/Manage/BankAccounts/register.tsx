import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BankAccountApi from "@src/application/api/bank-account.api";
import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import { SubmitButton } from "@src/application/components/SubmitButton";
import InputBankName, { useRefInputBankName } from "@src/application/screens/Manage/BankAccounts/components/InputBankName";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import TransferMethodDropdowns_V2 from "./components/SelectionTransferMethods";
import { BankAccountsStackParamList } from "./routes";

export type RegisterParams = undefined

type Props = NativeStackScreenProps<BankAccountsStackParamList, 'Register'>;

export default function Register({ route, navigation }: Props) {
  const theme = useTheme()
  var inputBankNameRef = useRefInputBankName();
  var inputCurrencyRef = useRefInputCurrency();

  let [selectionOfTransferMethods, setSelectionOfTransferMethods] = useState<Array<string>>([])

  const handleButton = async (): Promise<BankAccount | undefined> => {
    const nickname = inputBankNameRef.bank_name.current;
    const balance = inputCurrencyRef.currencyRef.current;

    if (nickname === undefined || nickname === "") {
      Alert.alert("Por favor, preencha o campo de nome da conta.");
      return;
    }
    if (balance === undefined) {
      Alert.alert("Por favor, preencha o campo de valor inicial.");
      return;
    }

    const bank_account = await BankAccountApi.register({
      nickname,
      balance: Number(balance),
      type_of_bank_transfers: selectionOfTransferMethods
    })
    if (!bank_account) {
      Alert.alert("Erro ao registrar conta bancária.");
      return undefined;
    }
    return bank_account;
  };

  return (
      <BasePageView>
      <BasePageTitle style={styles.title_page}>Registrar conta bancária</BasePageTitle>
      <ScrollView contentContainerStyle={styles.scroll_view_container}>
        <View style={styles.view_form}>
          <InputBankName refBankName={inputBankNameRef} />
          <InputCurrency
            label="Valor inicial da conta:"
            refCurrency={inputCurrencyRef}
          />
          
          <TransferMethodDropdowns_V2 
            ref={(returned) => {
              if(returned !== null){
                setSelectionOfTransferMethods(returned.selectionOfTransferMethods)
              }
            }}
          />
        </View>
      </ScrollView>
      <View>
        <SubmitButton
          variant="Add"
          onPress={() => {
            handleButton().then(result => {
              if (result !== undefined) {
                Alert.alert("Conta bancária registrada com sucesso!");
                // Atualiza a lista de contas bancárias com a nova conta criada
                navigation.popTo("Home", {
                  last_bank_account_modified: result.nickname
                });
              } else {
                Alert.alert("Erro ao registrar conta bancária.");
              }
            })
          }} />
      </View>
    </BasePageView>
  )
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
  view_transfer_methods: {
    padding: 10,
    gap: 10,
    flexDirection: "column",
    borderWidth: 4,
  },
  title_transfer_methods: {
    width: "75%",
    alignSelf: "center",
    textAlign: "center",
  },
});
