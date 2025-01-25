import BaseView from "@/components/BaseView";
import { MdiNamesIcon } from "@/components/ChooseIcon";
import InputCurrency, {
	useRefInputCurrency,
} from "@/components/Input/Currency/InputCurrency";
import InputDatePicker, {
	useRefInputDatePicker,
} from "@/components/Input/InputDatePicker";
import InputDescription, {
	useRefInputDescription,
} from "@/components/Input/InputDescription";
import InputRecurring, {
	useRefInputRecurring,
} from "@/components/Input/InputRecurring";
import TitlePage from "@/components/TitlePage";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export type AccountsBankRegisterParams = {
	id: string;
};

export default function AccountsBankRegister() {
	const { id } = useLocalSearchParams<AccountsBankRegisterParams>();

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

	return (
		<BaseView>
			<ScrollView>
				<TitlePage>Registrar conta bancária</TitlePage>
				<View style={styles.view_form}>
					<InputDescription ref={inputDescriptionRef} />
					<InputDatePicker ref={inputDatePickerRef} />
					<InputCurrency ref={inputCurrencyRef} />
					<InputRecurring ref={inputRecurringRef} />

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
			Registrar conta bancária
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
