import { StyleSheet } from "react-native";
import { Text, TextProps } from "react-native-paper";

interface BasePageTitleProps extends TextProps<never> {}

export default function BasePageTitle({
	style,
	children,
	...props
}: BasePageTitleProps) {
	return (
		<Text
			style={StyleSheet.compose(styles.title, style)}
			{...props}
		>
			{children}
		</Text>
	);
}
const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		textAlign: "center",
		marginBottom: 20,
	},
});
