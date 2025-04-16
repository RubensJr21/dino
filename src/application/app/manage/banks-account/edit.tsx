import BaseView from "@app-components/BaseView";
import { MdiNamesIcon } from "@app-components/ChooseIcon";
import InputBankAccount, {
    useRefInputBankAccount,
} from "@app-components/Input/InputBankAccount";
import InputBankAgency, {
    useRefInputBankAgency,
} from "@app-components/Input/InputBankAgency";
import InputBankName, {
    useRefInputBankName,
} from "@app-components/Input/InputBankName";
import { TextBold } from "@app-components/TextBold";
import TitlePage from "@app-components/TitlePage";
import { UnknownOutputParams } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export interface AccountsBankEditParams extends UnknownOutputParams {
	id: string;
	bank_name: string;
	agency: string;
	account: string;
}

export default function AccountsBankEdit() {
	const { id, bank_name, agency, account } =
		useLocalSearchParams<AccountsBankEditParams>();

	const inputBankNameRef = useRefInputBankName();
	const inputBankAgencyRef = useRefInputBankAgency();
	const inputBankAccountRef = useRefInputBankAccount();

	const handleButton = () => {
		// Validar valores antes de editar
		console.log({
			id: id,
			bank_name: inputBankNameRef.current?.value,
			agency: inputBankAgencyRef.current?.value,
			account: inputBankAccountRef.current?.value,
		});
	};

	return (
		<BaseView>
			<ScrollView>
				<TitlePage>
					Edição da conta no <TextBold>{bank_name}</TextBold>
				</TitlePage>
				<View style={styles.view_form}>
					<InputBankName
						ref={inputBankNameRef}
						value={bank_name}
						label="Nome do Banco:"
						placeholder="Insira o nome do Banco"
						inputMode="text"
					/>
					<InputBankAgency
						ref={inputBankAgencyRef}
						value={agency}
						label="Número da agência:"
						placeholder="Digite o número da agência"
						inputMode="numeric"
					/>
					<InputBankAccount
						ref={inputBankAccountRef}
						value={account}
						label="Número da conta:"
						placeholder="Digite o número da conta"
						inputMode="numeric"
					/>
					<EditButton onPress={handleButton} />
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
	view_form: {
		flex: 1,
		justifyContent: "flex-start",
		gap: 10,
	},
});
