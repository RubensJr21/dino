import { Picker } from "@react-native-picker/picker";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons, useTheme } from "react-native-paper";

import { recurrings_type } from "@src/application/_mocks/RecurringType";

enum recurring_values {
	not_recurring = "Não recorrente",
	recurring = "É recorrente",
}

export type RECURRING_TYPE = keyof typeof recurring_values;

const parameterButtons = Object.keys(recurring_values).map((key) => ({
	value: key as RECURRING_TYPE,
	label: recurring_values[key as keyof typeof recurring_values],
}));

export interface InputRecurringTypeRef {
	value: string;
	type: string;
}

export function useRefInputRecurring(): React.RefObject<InputRecurringTypeRef> {
	return useRef<InputRecurringTypeRef>(null);
}

interface InputRecurringProps {
	default_value?: RECURRING_TYPE;
}

export default forwardRef<InputRecurringTypeRef, InputRecurringProps>(
	({ default_value: value_received }, ref) => {
		const theme = useTheme();

		const [segmentValue, setSegmentValue] = useState<RECURRING_TYPE>(
			value_received ?? "not_recurring"
		);

		const [selectedType, setSelectedType] = useState<string>("java");

		useImperativeHandle(ref, () => {
			return {
				value: segmentValue,
				type: selectedType,
			};
		});

		return (
			<View style={styles.root_view}>
				<SegmentedButtons
					value={segmentValue}
					onValueChange={(value) => {
						setSegmentValue(value as RECURRING_TYPE);
					}}
					buttons={parameterButtons}
					style={styles.segmented_buttons}
				/>
				{segmentValue == "recurring" ? (
					<View
						style={[
							styles.picker_view,
							{ backgroundColor: theme.colors.primary },
						]}
					>
						<Picker
							selectedValue={selectedType}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedType(itemValue)
							}
							mode="dialog"
							placeholder="Tipo da recorrência"
							prompt=""
						>
							{recurrings_type.map((recurring_type, index, array) => {
								return (
									<Picker.Item
										key={recurring_type.id}
										label={recurring_type.type}
										value={recurring_type.id}
									/>
								);
							})}
						</Picker>
					</View>
				) : null}
			</View>
		);
	}
);

const styles = StyleSheet.create({
	root_view: {
		gap: 5, // Metade do valor do gap da página de create
	},
	text_label: {
		fontSize: 16,
		textAlign: "center",
	},
	picker_view: {
		backgroundColor: "red",
		borderRadius: 50,
	},
	segmented_buttons: {},
});
