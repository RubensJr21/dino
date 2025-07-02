import {
  useRef,
  useState
} from "react";
import { View } from "react-native";
import { TextInput } from 'react-native-paper';

export interface InputDescriptionTypeRef {
  value: React.MutableRefObject<string>;
  changeDescription: (text: string) => void;
}

export function useRefInputDescription(initialValue: string = ""): InputDescriptionTypeRef {
  const ref = useRef<string>(initialValue)
  const changeDescription = (text: string) => ref.current = text;
  return {
    value: ref,
    changeDescription,
  };
}

export interface InputDescriptionProps {
  placeholder: string;
  refDescription: InputDescriptionTypeRef;
}

export default function InputDescription({ placeholder, refDescription }: InputDescriptionProps) {
  const [description, setDescription] = useState<string>(refDescription.value.current);

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={description}
        onChangeText={(text) => {
          refDescription.changeDescription(text);
          setDescription(text)
        }}
      />
    </View>
  );
}