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
	RECURRING_TYPE,
	useRefInputRecurring,
} from "@/components/Input/InputRecurring";
import { TextBold } from "@/components/TextBold";
import TitlePage from "@/components/TitlePage";
import { UnknownOutputParams } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export interface ExpensesEditParams extends UnknownOutputParams {
	id: string;
	description: string;
	date: string;
	currency: `${number}`;
	recurring: RECURRING_TYPE;
}

export default function ExpensesEdit() {
	const { id, description, date, currency, recurring } =
		useLocalSearchParams<ExpensesEditParams>();

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
		});
	};

	return (
		<BaseView>
			<ScrollView>
				<TitlePage>
					Edição da entrada - <TextBold>{description}</TextBold>
				</TitlePage>
				<View style={styles.view_form}>
					<InputDescription
						value={description}
						ref={inputDescriptionRef}
					/>
					<InputDatePicker
						value={date}
						ref={inputDatePickerRef}
					/>
					<InputCurrency
						value={currency}
						ref={inputCurrencyRef}
					/>
					<InputRecurring
						default_value={recurring}
						ref={inputRecurringRef}
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
			Editar
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
