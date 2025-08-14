import {
  forwardRef,
  useEffect,
  useRef,
  useState
} from "react";
import { Keyboard, TextInput as RNTextInput, StyleSheet } from "react-native";
import { Text, TextInputProps } from "react-native-paper";
import TextCurrency from "./TextCurrency";

export interface InputCurrencyTypeRef {
	currencyRef: React.MutableRefObject<number>;
  changeCurrency: (currency: number) => void;
}

export function useRefInputCurrency(initialValue: number = 0): InputCurrencyTypeRef {
  const currencyRef = useRef<number>(initialValue);
  const changeCurrency = (currency: number) => currencyRef.current = currency;
  return {
    currencyRef,
    changeCurrency,
  };
}

export interface InputCurrencyProps {
  label: string;
	refCurrency: InputCurrencyTypeRef;
}

export default function InputCurrency({ refCurrency, label }: InputCurrencyProps) {
  const inputRef = useRef<RNTextInput>(null);

  const [value, setValue] = useState<number>(refCurrency.currencyRef.current);
  const [position, setPosition] = useState<ObjectPosition>(parseObjectPosition(value.toString()));

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
        value={value.toString()}
        onChangeText={(text) => {
          const value = parseStringToNumber(text.replace(/\D/g, ""))
          refCurrency.changeCurrency(value);
          setValue(value);
          setPosition(parseObjectPosition(text));
        }}
        onFocus={() => {
          setPosition(parseObjectPosition(value.toString()));
        }}
        position={position}
      />
    </>
  );
};

interface HideTextInputProps extends TextInputProps {
	position: { start: number; end: number };
}

const HideTextInput = forwardRef<RNTextInput, HideTextInputProps>(
	({ value, onChangeText, onFocus, position }, ref) => {
    const value_text = value?.toString()
		return (
			<RNTextInput
				ref={ref}
				value={(value_text?.length == 0 ? "" : value_text) ?? ""}
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

function parseStringToNumber(value: string): number {
  if (!value) return 0;
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}
type ObjectPosition = { start: number; end: number };

function parseObjectPosition(text: string): ObjectPosition {
  const length = text.length;
  return {
    start: length + 1,
    end: length + 1,
  };
}