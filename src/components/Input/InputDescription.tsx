import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

export interface InputDescriptionTypeRef {
	value: string;
}

export function useRefInputDescription(): React.RefObject<InputDescriptionTypeRef> {
	return useRef<InputDescriptionTypeRef>(null);
}

interface InputDescriptionProps {
	value?: string;
}

export default forwardRef<InputDescriptionTypeRef, InputDescriptionProps>(
	({ value: value_received }, ref) => {
		const [description, setDescription] = useState<string>(
			value_received || ""
		);

		useImperativeHandle(ref, () => {
			return {
				value: description,
			};
		});

		return (
			<View>
				<TextInput
					mode="outlined"
					label="Descrição:"
					placeholder="De onde veio esse valor?"
					value={description}
					onChangeText={(text) => setDescription(text)}
				/>
			</View>
		);
	}
);
