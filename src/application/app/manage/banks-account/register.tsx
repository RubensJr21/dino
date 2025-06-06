import BaseView from "@app-components/BaseView";
import { MdiNamesIcon } from "@app-components/ChooseIcon";
import TitlePage from "@app-components/TitlePage";
import BankAccountApi from "@src/application/api/bank-account.api";
import InputBankName, { useRefInputBankName } from "@src/application/components/bank-account/InputBankName";
import InputCurrency, { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import { createTogglesRef, TransferMethodsToggles } from "@src/application/components/TransferMethodsToggle";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { isBankAccountNicknameIsAlreadyInUse } from "@src/core/shared/errors/bank_account";
import { TransferMethods } from "@src/core/shared/types/transfer_methods";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export type AccountsBankRegisterParams = {
	id: string;
};

function generateInitialValuesToggles(): Record<TransferMethods, boolean> {
  return Object.fromEntries(
    Object.entries(TransferMethods).map(([key, value]) => [value, true])
  ) as Record<TransferMethods, boolean>;
}

export default function AccountsBankRegister() {
  const inputBankNameRef = useRefInputBankName();
  const inputCurrencyRef = useRefInputCurrency();
  const togglesRef = createTogglesRef();
  
	const handleButton = async (): Promise<BankAccount | undefined> => {
    const nickname = inputBankNameRef.current?.value;
    const balance = inputCurrencyRef.current?.value;

    if(nickname === undefined || nickname === "") {
      Alert.alert("Por favor, preencha o campo de nome da conta.");
      return;
    }
    if(balance === undefined || balance === "") {
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
          <InputBankName
            label="Nickname para conta:"
            placeholder="Digite o nome da conta"
            inputMode="text"
            ref={inputBankNameRef}
          />
          <InputCurrency
            ref={inputCurrencyRef}
            label="Valor inicial da conta:"
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
              var bank_account!: BankAccount;
              const result = await handleButton();
              if(result !== undefined) {
                bank_account = result;
                Alert.alert("Conta bancária registrada com sucesso!");
                return result;
              } else {
                Alert.alert("Erro ao registrar conta bancária.");
                return;
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
