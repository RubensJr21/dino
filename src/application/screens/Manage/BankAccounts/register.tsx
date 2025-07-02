import TitlePage from "@app-components/TitlePage";
import BankAccountApi from "@src/application/api/bank-account.api";
import BaseView from "@src/application/components/BaseView";
import { MdiNamesIcon } from "@src/application/components/ChooseIcon";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import InputBankName, { useRefInputBankName } from "@src/application/screens/Manage/BankAccounts/components/InputBankName";
import { createTogglesRef, TransferMethodsToggles } from "@src/application/screens/Manage/BankAccounts/components/TransferMethodsToggle";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { isBankAccountNicknameIsAlreadyInUse } from "@src/core/shared/errors/bank_account";
import { TransferMethods } from "@src/core/shared/types/transfer_methods";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export type RegisterParams = undefined

function generateInitialValuesToggles(): Record<TransferMethods, boolean> {
  return Object.fromEntries(
    Object.entries(TransferMethods).map(([key, value]) => [value, true])
  ) as Record<TransferMethods, boolean>;
}

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BankAccountsStackParamList } from "./routes";

type Props = NativeStackScreenProps<BankAccountsStackParamList, 'Register'>;

export default function Register({ route, navigation }: Props) {
  var inputBankNameRef = useRefInputBankName();
  var inputCurrencyRef = useRefInputCurrency();
  const togglesRef = createTogglesRef();
  
	const handleButton = async (): Promise<BankAccount | undefined> => {
    const nickname = inputBankNameRef.bank_name.current;
    const balance = inputCurrencyRef.currencyRef.current;

    if(nickname === undefined || nickname === "") {
      Alert.alert("Por favor, preencha o campo de nome da conta.");
      return;
    }
    if(balance === undefined) {
      Alert.alert("Por favor, preencha o campo de valor inicial.");
      return;
    }
    try {
      return await BankAccountApi.register.execute({
        nickname,
        balance: Number(balance),
        type_of_bank_transfers: {
          "Pix": togglesRef["Pix"].current?.value ?? true,
          "Débito": togglesRef["Débito"].current?.value ?? true,
          "Transferência Bancária": togglesRef["Transferência Bancária"].current?.value ?? true
        }
      })
    } catch (error) {
      if(isBankAccountNicknameIsAlreadyInUse(error)) {
        Alert.alert("Esse nome de conta já está em uso.");
        return;
      }

      Alert.alert("Erro ao registrar conta bancária.");
      return;
    }
	};

	return (
		<BaseView>
			<ScrollView>
				<TitlePage>Registrar conta bancária</TitlePage>
				<View style={styles.view_form}>
          <InputBankName refBankName={inputBankNameRef} />
          <InputCurrency
            label="Valor inicial da conta:"
            refCurrency={inputCurrencyRef}
          />
          
          <View style={styles.view_transfer_methods}>
            <Text
              style={styles.title_transfer_methods}
              children={"Métodos de transferência:"}
              variant="headlineLarge"
              numberOfLines={2}
            />
            <TransferMethodsToggles
              data={togglesRef}
              initialValues={generateInitialValuesToggles()}
            />
          </View>
          <RegisterButton
            onPress={async () => {
              const result = await handleButton();
              if(result !== undefined) {
                Alert.alert("Conta bancária registrada com sucesso!");
                // Atualiza a lista de contas bancárias com a nova conta criada
                navigation.popTo("Home", {
                  last_bank_account_modified: result.nickname
                });
              } else {
                Alert.alert("Erro ao registrar conta bancária.");
              }
            }}
          />
				</View>
			</ScrollView>
		</BaseView>
	);
}

interface RegisterButtonProps {
	onPress: () => void;
}

const RegisterButton = ({ onPress }: RegisterButtonProps) => {
	return (
		<Button
			mode="contained"
			icon={"plus-box" as MdiNamesIcon}
			contentStyle={{ flexDirection: "row-reverse" }}
			onPress={onPress}
		>
			Registrar conta bancária
		</Button>
	);
};

const styles = StyleSheet.create({
  title_transfer_methods: {
    width: "75%",
    alignSelf: "center",
    textAlign: "center"
  },
  view_transfer_methods: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
	view_form: {
		flex: 1,
		justifyContent: "flex-start",
		gap: 10,
	},
});
