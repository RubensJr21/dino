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
import {
  RECURRING_TYPE,
  useRefInputRecurring,
} from "@app-components/Input/InputRecurring";
import { TextBold } from "@app-components/TextBold";
import TitlePage from "@app-components/TitlePage";
import { UnknownOutputParams } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export interface IncomesEditParams extends UnknownOutputParams {
	id: string;
	description: string;
	date: string;
	currency: `${number}`;
	recurring: RECURRING_TYPE;
}

export default function IncomesEdit() {
	const { id, description, date, currency, recurring } =
		useLocalSearchParams<IncomesEditParams>();

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
					Edição do recebimento recorrente - ({id}) <TextBold>{description}</TextBold>
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
            label="Valor"
						value={currency}
						ref={inputCurrencyRef}
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
			Editar recebimento
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
