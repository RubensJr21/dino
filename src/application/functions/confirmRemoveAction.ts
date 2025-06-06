import { Alert } from "react-native";

// eslint-disable-next-line jsdoc/require-jsdoc
export function confirmRemoveAction(action: () => void) {
	return () => {
		// title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions
		Alert.alert("Atenção!", `Deseja mesmo remover este item?`, [
			{
				text: "Sim",
				onPress: action,
				style: "destructive",
			},
			{
				text: "Não",
				// eslint-disable-next-line jsdoc/require-jsdoc
				onPress: () => {},
				style: "cancel",
			},
		]);
	};
}