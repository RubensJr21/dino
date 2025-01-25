import { usePathname } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { useEffect } from "react";
import { ColorSchemeName, StatusBar, useColorScheme } from "react-native";

import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { MdiIcons, MdiNamesIcon } from "@/components/ChooseIcon";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TabScreens = () => {
	return (
		<Tabs
			initialRouteName="index"
			screenOptions={{
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: (props) => (
						<MdiIcons
							name="home"
							{...props}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="expenses"
				options={{
					title: "Entradas",
					tabBarIcon: (props) => (
						<MdiIcons
							name="cash-plus"
							{...props}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="incomes"
				options={{
					title: "Saídas",
					tabBarIcon: (props) => (
						<MdiIcons
							name="cash-minus"
							{...props}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="manage"
				options={{
					title: "Gerenciar",
					tabBarIcon: (props) => (
						<MdiIcons
							// name="collage"
							// name="land-plots"
							// name="cogs"
							name="view-dashboard-edit"
							{...props}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default function LayoutRoot() {
	const scheme: ColorSchemeName = useColorScheme();
	const isDark: boolean = scheme === "dark";

	const pathname = usePathname();

	useEffect(() => {
		setTimeout(() => {
			StatusBar.setBarStyle("light-content");
		}, 0);
	}, [pathname]);

	return (
		<ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
			<SafeAreaProvider>
				<GestureHandlerRootView>
					<PaperProvider
						theme={isDark ? MD3DarkTheme : MD3LightTheme}
						settings={{
							icon: ({ name, color, size, direction, testID }) => (
								<MdiIcons
									name={name as MdiNamesIcon}
									color={color}
									size={size}
									testID={testID}
								/>
							),
						}}
					>
						<TabScreens />
					</PaperProvider>
					<StatusBar barStyle={"default"} />
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</ThemeProvider>
	);
}
