import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { HelperText, TextInput } from "react-native-paper";

export interface InputDatePickerTypeRef {
	value: string;
}

export function useRefInputDatePicker(): React.RefObject<InputDatePickerTypeRef> {
	return useRef<InputDatePickerTypeRef>(null);
}

interface InputDatePickerProps {
	value?: string;
}

const isValidDate = (date: string) => {
	const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

	if (!regexDate.test(date)) return false;

	const [day, month, year] = date.split("/").map(Number);

	const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	const daysInMonth = [
		31,
		isLeapYear ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
	];

	return day <= daysInMonth[month - 1];
};

function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number,
	timeoutId: ReturnType<typeof setTimeout> | undefined
): (...args: Parameters<T>) => void {
	return (...args: Parameters<T>) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(...args), delay);
	};
}

export default forwardRef<InputDatePickerTypeRef, InputDatePickerProps>(
	function InputDatePicker({ value: value_received }, ref) {
		let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

		const updateErrorAfterOnFocus = debounce(
			() => setError(false),
			1500,
			timeoutId
		);

		const onHandleChange = (_: DateTimePickerEvent, date: Date | undefined) => {
			if (date) setInputDate(date?.toLocaleDateString());
		};

		const [error, setError] = useState<boolean>(false);

		let dateValue: string;

		if (value_received !== undefined) {
			dateValue = isValidDate(value_received)
				? value_received
				: new Date().toLocaleDateString();
		} else {
			dateValue = new Date().toLocaleDateString();
		}

		const [inputDate, setInputDate] = useState<string>(dateValue);

		useImperativeHandle(ref, () => {
			return {
				value: inputDate,
			};
		});

		return (
			<>
				<TextInput
					mode="outlined"
					inputMode="numeric"
					secureTextEntry={false}
					label="Data:"
					placeholder="dd/mm/yyyy"
					value={inputDate}
					error={error}
					right={
						<TextInput.Icon
							icon="calendar"
							onPressIn={(e) => {
								e.stopPropagation();
								DateTimePickerAndroid.open({
									value: /([0-9]{2}\/){2}\/[0-9]{4}/.test(inputDate)
										? new Date(inputDate)
										: new Date(),
									onChange: onHandleChange,
								});
								DateTimePickerAndroid.dismiss("date");
							}}
							onTouchEnd={(e) => {
								e.stopPropagation();
							}}
						/>
					}
					onTouchEnd={(e) => {
						e.isPropagationStopped();
					}}
					onFocus={() => {
						updateErrorAfterOnFocus();
					}}
					onChangeText={(text) => {
						// Data é validada quando o componente perde o foco
						const newText = text
							// \D = [^0-9] e \d = [0-9]
							.replace(/\D$/, "")
							// Insere a barra após os dois primeiros dígitos
							.replace(/^(\d{2})(\d)/, "$1/$2")
							// Insere a barra após os quatro primeiros caracteres
							.replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2");
						setInputDate(newText);
					}}
					// Função equivalente ao onBlur
					onEndEditing={(e) => {
						setError(!isValidDate(e.nativeEvent.text));
						clearTimeout(timeoutId);
					}}
					maxLength={10}
				/>
				{error && <HelperText type="error">Data inválida</HelperText>}
			</>
		);
	}
);
