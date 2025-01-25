import { StyleSheet } from "react-native";
import { Text, TextProps } from "react-native-paper";

interface TitlePageProps extends TextProps<never> {}
export default function TitlePage({
	style,
	children,
	...props
}: TitlePageProps) {
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
