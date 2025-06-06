import BaseView from "@app-components/BaseView";
import { MdiNamesIcon } from "@app-components/ChooseIcon";
import { TextBold } from "@app-components/TextBold";
import TitlePage from "@app-components/TitlePage";
import BankAccountApi from "@src/application/api/bank-account.api";
import InputBankName, {
  useRefInputBankName,
} from "@src/application/components/bank-account/InputBankName";
import { createTogglesRef, TransferMethodsToggles } from "@src/application/components/TransferMethodsToggle";
import { BankAccount } from "@src/core/entities/bank_account.entity";
import { isBankAccountNicknameIsAlreadyInUse } from "@src/core/shared/errors/bank_account";
import { TransferMethods } from "@src/core/shared/types/transfer_methods";
import { UnknownOutputParams } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export interface AccountsBankEditParams extends UnknownOutputParams {
	id: string;
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

export default function AccountsBankEdit() {
	const {
    id,
    nickname,
    transfer_methods
  } = useLocalSearchParams<AccountsBankEditParams>();

	const inputBankNameRef = useRefInputBankName();

  const togglesRef = createTogglesRef();
  const initialValuesToggles = parseTransferMethods(transfer_methods);
  console.log(initialValuesToggles);

	const handleButton = async (): Promise<BankAccount | undefined> => {
    const nickname = inputBankNameRef.current?.value;

    if(nickname === undefined || nickname === "") {
      Alert.alert("Por favor, preencha o campo de nome da conta.");
      return;
    }
    try {      
      let bank_account = await BankAccountApi.update_nickname.execute({
        id: Number(id),
        new_nickname: nickname
      })

      bank_account = await BankAccountApi.update_transfer_methods.execute({
        id: bank_account.id,
        type_of_bank_transfers: getValuesRef(togglesRef)
      });
      
      return bank_account;
      // TODO: Testar tela completa de edição de conta bancária
    } catch (error) {
      if(isBankAccountNicknameIsAlreadyInUse(error)) {
        Alert.alert("Esse nome de conta já está em uso.");
        return;
      }

      Alert.alert("Erro ao registrar conta bancária.");
      console.error("Error:", error);
      return;
    }
  };

	return (
		<BaseView>
			<ScrollView>
				<TitlePage>
					Edição da conta no <TextBold>{nickname}</TextBold>
				</TitlePage>
				<View style={styles.view_form}>
					<InputBankName
						ref={inputBankNameRef}
						value={nickname}
						label="Nickname para conta:"
						placeholder="Digite o nome da conta"
						inputMode="text"
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

					<EditButton onPress={async () => {
              var bank_account!: BankAccount;
              const result = await handleButton();
              if(result !== undefined) {
                bank_account = result;
                Alert.alert("Conta bancária atualizada com sucesso!");
                return result;
              } else {
                Alert.alert("Erro ao atualizar conta bancária.");
                return;
              }
            }} />
				</View>
			</ScrollView>
		</BaseView>
	);
}

interface EditButtonProps {
	onPress: () => void;
}

const EditButton = ({ onPress }: EditButtonProps) => {
	return (
		<Button
			mode="contained"
			icon={"pencil" as MdiNamesIcon}
			contentStyle={{ flexDirection: "row-reverse" }}
			onPress={onPress}
		>
			Editar conta
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
