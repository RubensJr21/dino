import BankAccountApi from "@src/application/api/bank-account.api";
import { TextBold } from "@src/application/components/Text/TextBold";
import InputBankName, {
  useRefInputBankName,
} from "@src/application/screens/Manage/BankAccounts/components/InputBankName";
import { createTogglesRef, TransferMethodsToggles } from "@src/application/screens/Manage/BankAccounts/components/TransferMethodsToggle";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { isBankAccountNicknameIsAlreadyInUse } from "@src/core/shared/errors/bank_account";
import { TransferMethods } from "@src/core/shared/types/transfer_methods";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export interface EditParams {
  id: number;
  nickname: string;
  transfer_methods: string;
}

function parseTransferMethods(transfer_methods: string) {
  const methodsArray = JSON.parse(transfer_methods) as Record<TransferMethods, boolean>;
  return methodsArray
}

function getValuesRef(togglesRef: Record<TransferMethods, React.RefObject<{ value: boolean }>>) {
  return Object.fromEntries(
    Object.entries(togglesRef).map(([key, ref]) => [key, ref.current?.value ?? true])
  ) as Record<TransferMethods, boolean>;
}

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import { SubmitButton } from "@src/application/components/SubmitButton";
import { BankAccountsStackParamList } from "./routes";

type Props = NativeStackScreenProps<BankAccountsStackParamList, 'Edit'>;

export default function Edit({route, navigation}: Props) {
  const {
    id,
    nickname,
    transfer_methods
  } = route.params

	const inputBankNameRef = useRefInputBankName(nickname);

  const togglesRef = createTogglesRef();
  const initialValuesToggles = parseTransferMethods(transfer_methods);

	const handleButton = async (): Promise<BankAccount | undefined> => {
    const new_nickname = inputBankNameRef.bank_name.current;

    if(new_nickname === undefined || new_nickname === "") {
      Alert.alert("Por favor, preencha o campo de nome da conta.");
      return;
    }
    try {
      let bank_account = await BankAccountApi.update_nickname.execute({
        id,
        new_nickname
      })

      bank_account = await BankAccountApi.update_transfer_methods.execute({
        id: bank_account.id,
        type_of_bank_transfers: getValuesRef(togglesRef)
      });
      
      return bank_account;
    } catch (error) {
      if(isBankAccountNicknameIsAlreadyInUse(error)) {
        Alert.alert("Esse nome de conta já está em uso.");
        return;
      }
      console.error("Error:", error);
    }
  };

	return (
		<BasePageView>
			<ScrollView>
				<BasePageTitle>
					Edição da conta no <TextBold>{nickname}</TextBold>
				</BasePageTitle>
				<View style={styles.view_form}>
					<InputBankName
            refBankName={inputBankNameRef}
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
              initialValues={initialValuesToggles}
            />
          </View>

          <SubmitButton variant="Edit" onPress={async () => {
              const result = await handleButton();
              if(result !== undefined) {
                Alert.alert("Conta bancária atualizada com sucesso!");
                navigation.popTo("Home", {
                  last_bank_account_modified: result.nickname
                });
              } else {
                Alert.alert("Erro ao atualizar conta bancária.");
              }
            }} />
				</View>
			</ScrollView>
		</BasePageView>
	);
}

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
