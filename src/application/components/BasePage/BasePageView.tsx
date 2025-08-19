import {
  StyleSheet,
  View,
  ViewProps
} from "react-native";

interface BasePageViewProps extends ViewProps {}

export default function BasePageView({ style, children, ...props }: BasePageViewProps) {
  return (
    <View style={styles.view_root}>
      {children}
    </View>
  )
	// return (
	// 	<KeyboardAvoidingView
	// 		style={StyleSheet.compose(styles.baseView, style)}
	// 		behavior={Platform.select({
	// 			ios: "padding",
	// 			android: "height",
	// 		})}
	// 		enabled
	// 		keyboardVerticalOffset={90}
	// 		{...props}
	// 	>
	// 		{children}
	// 	</KeyboardAvoidingView>
	// );
}

const styles = StyleSheet.create({
  view_root: {
    flex: 1,
    rowGap: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
	baseView: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
});
