import BaseView from "@/components/BaseView";
import { MdiNamesIcon } from "@/components/ChooseIcon";
import InputPixKey, { useRefInputPixKey } from "@/components/Input/InputPixKey";
import { TextBold } from "@/components/TextBold";
import TitlePage from "@/components/TitlePage";
import { UnknownOutputParams, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export interface PixKeysRegisterParams extends UnknownOutputParams {
	bank_id: string;
	bank_name: string;
	agency: string;
	account: string;
}

export default function PixKeysRegister() {
	const { bank_id, bank_name, agency, account } =
		useLocalSearchParams<PixKeysRegisterParams>();

	const inputPixKeyRef = useRefInputPixKey();

	const handleButton = () => {
		console.log({
			key: inputPixKeyRef.current?.value,
		});
	};

	return (
		<BaseView>
			<ScrollView>
				<TitlePage>
					Registrar chave pix do <TextBold>{bank_name}</TextBold>{" "}
				</TitlePage>
				<View style={styles.view_form}>
					<InputPixKey
						ref={inputPixKeyRef}
						label="Chave Pix"
						placeholder="Digite aqui sua chave pix"
						inputMode="none"
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
			Registrar chave Pix
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
