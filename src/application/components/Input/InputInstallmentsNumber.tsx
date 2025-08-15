import { useCallback, useMemo, useRef, useState } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { IconNames, MCIcons } from "../Icons.lib";

const DEFAULT_MIN_INSTALLMENT_NUMBER = 2

export interface InputInstallmentsNumberTypeRef {
  installments_number: React.MutableRefObject<number>;
  changeType: (text: number) => number;
}

export function useRefInputInstallmentsNumber(initialValue: number = DEFAULT_MIN_INSTALLMENT_NUMBER): InputInstallmentsNumberTypeRef {
  const ref = useRef<number>(initialValue);
  const changeType = (number: number) => ref.current = number;
  return {
    installments_number: ref,
    changeType,
  };
}

interface InputInstallmentsNumberProps {
  label: string;
  refInstallmentNumber: InputInstallmentsNumberTypeRef;
}

export default function InputInstallmentsNumber({ label, refInstallmentNumber }: InputInstallmentsNumberProps) {
  const [value, setValue] = useState(refInstallmentNumber.installments_number.current)

  // 1) Fábrica de ícones (memoizada ou não)
  const makeIcon = useCallback(
    (icon: IconNames<typeof MCIcons>, onPress: (e: GestureResponderEvent) => void) => (
      <TextInput.Icon
        key={icon}
        icon={icon}
        mode="contained-tonal"
        style={{ borderRadius: 5 }}
        onPress={onPress}
        forceTextInputFocus={false}
      />
    ),
    []
  );

  // 2) Se quiser memoizar ambos de uma vez:
  const Buttons = useMemo(() => ({
    Minus: makeIcon('minus', (e: GestureResponderEvent) => setValue((prev) => {
      if (prev - 1 >= DEFAULT_MIN_INSTALLMENT_NUMBER) {
        refInstallmentNumber.changeType(prev--);
        return prev--;
      } else {
        return prev;
      }
    })),
    Plus: makeIcon('plus', (e: GestureResponderEvent) => setValue((prev) => {
      refInstallmentNumber.changeType(prev++)
      return prev++;
    })),
  }), [makeIcon]);

  return (
    <>
      <Text
        children={label}
        style={styles.label}
        variant="titleMedium"
      />
      <TextInput
        value={value.toString()}
        onChangeText={(text: string) => {
          const onlyNumbers = /[0-9]*/g.exec(text)?.[0] ?? `${DEFAULT_MIN_INSTALLMENT_NUMBER}`
          refInstallmentNumber.changeType(parseInt(onlyNumbers))
          setValue(refInstallmentNumber.installments_number.current)
        }}
        contentStyle={{
          textAlign: "center"
        }}
        left={Buttons.Minus}
        right={Buttons.Plus}
        inputMode={"numeric"}
        mode="outlined"
      />
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    padding: 4,
  }
})