import BaseView from "@/components/BaseView";
import { MdiNamesIcon } from "@/components/ChooseIcon";
import InputCurrency, {
	useRefInputCurrency,
} from "@/components/Input/Currency/InputCurrency";
import InputCreditCardName, {
	useRefInputCreditCardName,
} from "@/components/Input/InputCreditCardName";
import TitlePage from "@/components/TitlePage";
import { UnknownOutputParams, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export interface CreditCardsEditParams extends UnknownOutputParams {
	id: string;
	name: string;
	limit: string;
}

export default function CreditCardsEdit() {
	const { id, name, limit } = useLocalSearchParams<CreditCardsEditParams>();
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
						value={name}
						label="Nome do cartão:"
						placeholder="Digite um nome para o cartão"
						inputMode="none"
					/>
					<InputCurrency
						ref={inputCurrencyRef}
						value={`${Number(limit)}`}
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
			Editar cartão de crédito
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
