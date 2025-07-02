import {
  useRef,
  useState
} from "react";
import { View } from "react-native";
import { TextInput } from 'react-native-paper';

export interface InputBankNameTypeRef {
  bank_name: React.MutableRefObject<string>;
  changeBankName: (text: string) => void;
}

export function useRefInputBankName(initialValue: string = ""): InputBankNameTypeRef {
  const ref = useRef<string>(initialValue)
  const changeBankName = (text: string) => ref.current = text;
  return {
    bank_name: ref,
    changeBankName,
  };
}

interface InputBankNameProps {
  refBankName: InputBankNameTypeRef;
}

export default function InputBankName({ refBankName }: InputBankNameProps) {
  const [bank_name, setBankName] = useState<string>(refBankName.bank_name.current);

  return (
    <View>
      <TextInput
        mode="outlined"
        inputMode="text"
        label="Nickname para conta:"
        placeholder="Digite o nome da conta"
        value={bank_name}
        onChangeText={(text) => {
          refBankName.changeBankName(text);
          setBankName(text)
        }}
      />
    </View>
  );
}