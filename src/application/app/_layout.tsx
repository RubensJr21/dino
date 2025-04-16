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

import { MdiIcons, MdiNamesIcon } from "@app-components/ChooseIcon";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TabScreens = () => {
	return (
		<Tabs
			initialRouteName="index"
			screenOptions={{
				tabBarHideOnKeyboard: true,
				headerShown: false,
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
				name="incomes"
				options={{
					title: "Recebimentos",
					tabBarIcon: (props) => (
						<MdiIcons
							name="cash-plus"
							{...props}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="expenses"
				options={{
					title: "Pagamentos",
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

import migrations from "@root/drizzle/migrations";
import { db, expoDb } from "@src/infrastructure/database/drizzle/client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

export default function LayoutRoot() {
	const { success, error } = useMigrations(db, migrations);
	useDrizzleStudio(expoDb);
	// TODO: Usar a Suspense API para mostrar:
	// 		 error: exibir algum alerta
	// 		 !success: está carregando ActivityIndicator
	// 		 success: seguir com a aplicação

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