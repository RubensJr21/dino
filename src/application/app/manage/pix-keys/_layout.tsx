import { Stack } from "expo-router";

export default function LayoutPixKeys() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="index"
		>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="register"
				options={{
					animation: "slide_from_right",
				}}
			/>
			<Stack.Screen
				name="edit"
				options={{
					animation: "slide_from_right",
				}}
			/>
		</Stack>
	);
}
