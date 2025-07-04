import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewProps,
} from "react-native";

interface BasePageViewProps extends ViewProps {}

export default function BasePageView({ style, children, ...props }: BasePageViewProps) {
	return (
		<KeyboardAvoidingView
			style={StyleSheet.compose(styles.baseView, style)}
			behavior={Platform.select({
				ios: "padding",
				android: "height",
			})}
			enabled
			keyboardVerticalOffset={90}
			{...props}
		>
			{children}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	baseView: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
});
