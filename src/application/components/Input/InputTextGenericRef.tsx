import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { InputModeOptions, View } from "react-native";
import { TextInput } from "react-native-paper";

export interface InputTextGenericRefTypeRef {
	value: string;
}

export function useRefInputGenericRef<
	T extends InputTextGenericRefTypeRef
>(): React.RefObject<T> {
	return useRef<T>(null);
}

export interface InputTextGenericRefProps {
	label: string;
	placeholder: string;
	value?: string;
	inputMode: InputModeOptions;
}

export const createComponentInputText = <
	T extends InputTextGenericRefTypeRef,
	U extends InputTextGenericRefProps
>() =>
	forwardRef<T, U>(
		({ value: value_received, label, placeholder, inputMode }, ref) => {
			const [textGeneric, setTextGeneric] = useState<string>(
				value_received || ""
			);

			useImperativeHandle(ref, () => {
				return {
					value: textGeneric,
				} as T;
			});

			return (
				<View>
					<TextInput
						mode="outlined"
						inputMode={inputMode}
						label={label}
						placeholder={placeholder}
						value={textGeneric}
						onChangeText={(text) => setTextGeneric(text)}
					/>
				</View>
			);
		}
	);
