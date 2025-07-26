import { Alert } from "react-native";

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
								onPress: () => {},
				style: "cancel",
			},
		]);
	};
}