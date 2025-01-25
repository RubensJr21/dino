import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Text } from "react-native-paper";

interface RawTextProps {
	children: string | string[];
	style?: StyleProp<TextStyle>;
}

export const RawText = ({ children, style }: RawTextProps) => {
	return <Text style={[styles.raw_text_base, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
	raw_text_base: {
		flex: 0,
	},
});
