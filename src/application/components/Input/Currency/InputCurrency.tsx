import { Currency } from "@application/classes/Currency";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Keyboard, TextInput as RNTextInput, StyleSheet } from "react-native";
import { Text, TextInputProps } from "react-native-paper";
import TextCurrency from "./TextCurrency";

export interface InputCurrencyTypeRef {
	value: string;
}

export function useRefInputCurrency(): React.RefObject<InputCurrencyTypeRef> {
	return useRef<InputCurrencyTypeRef>(null);
}

interface InputCurrencyProps {
	value?: number | string;
  label: string;
}

export default forwardRef<InputCurrencyTypeRef, InputCurrencyProps>(
	({ value: value_received, label }, ref) => {
		const inputRef = useRef<RNTextInput>(null);

		value_received = `${Number(value_received) * 100}`;

		const [value, setValue] = useState<string>(value_received ?? "");
		const [position, setPosition] = useState({
			start: 0,
			end: 0,
		});

		useImperativeHandle(ref, () => {
			const c: Currency = new Currency(value);
			return {
				value: c.formattedValue,
			};
		});

		useEffect(() => {
			const hideListener = Keyboard.addListener("keyboardDidHide", () =>
				inputRef.current?.blur()
			);

			return () => hideListener.remove();
		}, []);

		return (
			<>
        <Text
          children={label}
          style={styles.label}
          variant="titleLarge"
        />
				<TextCurrency
					value={value}
					onPress={() => inputRef.current?.focus()}
				/>
				<HideTextInput
					ref={inputRef}
					value={value}
					onChangeText={(text) => {
						setValue(text.replace(/\D/g, ""));
						setPosition({ start: text.length, end: text.length });
					}}
					onFocus={() => {
						setPosition({ start: value.length, end: value.length });
					}}
					position={position}
				/>
			</>
		);
	}
);

interface HideTextInputProps extends TextInputProps {
	position: { start: number; end: number };
}

const HideTextInput = forwardRef<RNTextInput, HideTextInputProps>(
	({ value, onChangeText, onFocus, position }, ref) => {
		return (
			<RNTextInput
				ref={ref}
				value={value}
				onChangeText={onChangeText}
				onFocus={onFocus}
				style={[styles.hideInput, styles.show_color]}
				keyboardType="numeric"
				secureTextEntry={false}
				selection={position}
				maxLength={11}
			/>
		);
	}
);

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    textAlignVertical: "center"
  },
	hideInput: {
		position: "absolute",
		opacity: 0,
		height: 0,
		width: 0,
	},
	show_color: {
		color: "white",
	},
});
