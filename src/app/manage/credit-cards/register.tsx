import BaseView from "@/components/BaseView";
import { MdiNamesIcon } from "@/components/ChooseIcon";
import InputCurrency, {
	useRefInputCurrency,
} from "@/components/Input/Currency/InputCurrency";
import InputCreditCardName, {
	useRefInputCreditCardName,
} from "@/components/Input/InputCreditCardName";
import TitlePage from "@/components/TitlePage";
import React from "react";
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
					<InputCurrency ref={inputCurrencyRef} />

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
