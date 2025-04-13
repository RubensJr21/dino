import BaseView from "@app-components/BaseView";
import { MdiNamesIcon } from "@app-components/ChooseIcon";
import InputPixKey, { useRefInputPixKey } from "@app-components/Input/InputPixKey";
import { TextBold } from "@app-components/TextBold";
import TitlePage from "@app-components/TitlePage";
import { UnknownOutputParams, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export interface PixKeysEditParams extends UnknownOutputParams {
	pixkey_id: string;
	key: string;
	bank_id: string;
	bank_name: string;
	agency: string;
	account: string;
}

export default function PixKeysEdit() {
	const { pixkey_id, key, bank_id, bank_name, agency, account } =
		useLocalSearchParams<PixKeysEditParams>();

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
					Editar chave pix do <TextBold>{bank_name}</TextBold>{" "}
				</TitlePage>
				<View style={styles.view_form}>
					<InputPixKey
						ref={inputPixKeyRef}
						label="Chave Pix"
						placeholder="Digite aqui sua chave pix"
						inputMode="none"
						value={key}
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
			Editar chave Pix
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
