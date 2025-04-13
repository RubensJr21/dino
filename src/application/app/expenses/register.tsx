import BaseView from "@app-components/BaseView";
import { MdiNamesIcon } from "@app-components/ChooseIcon";
import InputCurrency, {
    useRefInputCurrency,
} from "@app-components/Input/Currency/InputCurrency";
import InputDatePicker, {
    useRefInputDatePicker,
} from "@app-components/Input/InputDatePicker";
import InputDescription, {
    useRefInputDescription,
} from "@app-components/Input/InputDescription";
import InputRecurring, {
    useRefInputRecurring,
} from "@app-components/Input/InputRecurring";
import TitlePage from "@app-components/TitlePage";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export type ExpensesRegisterParams = {
	id: string;
};

export default function ExpensesRegister() {
	const { id } = useLocalSearchParams<ExpensesRegisterParams>();

	const inputDescriptionRef = useRefInputDescription();
	const inputDatePickerRef = useRefInputDatePicker();
	const inputCurrencyRef = useRefInputCurrency();
	const inputRecurringRef = useRefInputRecurring();

	const handleButton = () => {
		console.log({
			currency: inputCurrencyRef.current?.value,
			description: inputDescriptionRef.current?.value,
			date: inputDatePickerRef.current?.value,
			recurring: inputRecurringRef.current?.value,
			recurring_type: inputRecurringRef.current?.type,
		});
	};

	// TODO: Preciso informar para onde está saindo aquele valor

	return (
		<BaseView>
			<ScrollView>
				<TitlePage>Registrar pagamento</TitlePage>
				<View style={styles.view_form}>
					<InputDescription ref={inputDescriptionRef} />
					<InputDatePicker ref={inputDatePickerRef} />
					<InputCurrency ref={inputCurrencyRef} />
					<InputRecurring ref={inputRecurringRef} />

					{
						// TODO: É Necessário verificar se é normal, recorrente ou à prazo
						// FIXME: Talvez passar um 'type' na chamada dessa tela possa ajudar
						// TODO: (Preciso falar com prof.) Nem sempre os pagamentos serão por cartão de crédito, é necessário mudar o modelo de dados para que as tabelas de gasto dependam de método de pagamento e não ter fixo o ligamento com cartão de crédito
						// TODO: Na tabela de gasto_recorrente verificar a possibilidade de registrar também quando foi desabilitado
					}

					<RegisterButton onPress={handleButton} />
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
			Registrar pagamento
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
