import BaseView from "@app-components/BaseView";
import { MdiNamesIcon } from "@app-components/ChooseIcon";
import InputCreditCardName, {
  useRefInputCreditCardName,
} from "@app-components/credit-card/InputCreditCardName";
import InputCurrency, {
  useRefInputCurrency,
} from "@app-components/Input/Currency/InputCurrency";
import TitlePage from "@app-components/TitlePage";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function CreditCardsRegister() {
	const inputCreditCardNameRef = useRefInputCreditCardName();
	const inputCurrencyRef = useRefInputCurrency();

	const handleButton = () => {
		console.log({
			name: inputCreditCardNameRef.current?.value,
			limit: inputCurrencyRef.current?.value,
		});
	};

	return (
		<BaseView>
			<ScrollView>
				<TitlePage>Registrar conta bancária</TitlePage>
				<View style={styles.view_form}>
					<InputCreditCardName
						ref={inputCreditCardNameRef}
						label="Nome do cartão:"
						placeholder="Digite um nome para o cartão"
						inputMode="none"
					/>
					<InputCurrency
            label="Limite do cartão:"
            ref={inputCurrencyRef}
          />

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
			Registrar cartão de crédito
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
