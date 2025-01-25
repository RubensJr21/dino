import { Stack } from "expo-router";

export default function LayoutManage() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="index"
		>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="banks-account"
				options={{
					animation: "slide_from_right",
				}}
			/>
			<Stack.Screen
				name="credit-cards"
				options={{
					animation: "slide_from_right",
				}}
			/>
			<Stack.Screen
				name="pix-keys"
				options={{
					animation: "slide_from_right",
				}}
			/>
		</Stack>
	);
}
