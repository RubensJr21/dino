import { Alert, ColorSchemeName, useColorScheme, View } from "react-native";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from "@react-navigation/native";
import {
  ActivityIndicator,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  PaperProvider,
  Text
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { MCIcons, type IconNames } from "@src/application/components/Icons.lib";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootRoutes from "./root.routes";

import migrations from "@root/drizzle/migrations";
import { populate_database } from "@src/core/start_configs";
import { db, expoDb } from "@src/infrastructure/database/client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMemo, useState } from "react";

const RNavigationDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: PaperDefaultTheme.colors.primary,
    background: PaperDefaultTheme.colors.background
  },
};

const RNavigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: PaperDarkTheme.colors.primary,
    background: PaperDarkTheme.colors.background
  },
};

export default function Root() {
  const { success, error } = useMigrations(db, migrations);
  const [started, setStarted] = useState<boolean>(false)
  useDrizzleStudio(expoDb);

  const scheme: ColorSchemeName = useColorScheme();
  const isDark: boolean = scheme === "dark";

  const themePaper = isDark ? PaperDarkTheme : PaperDefaultTheme;
  const themeNavigation = isDark ? RNavigationDarkTheme : RNavigationDefaultTheme;

  const _ = useMemo(() => {
    if (success) {
      populate_database()
        .then(() => {
          setStarted(true)
        })
        .catch(() => {
          Alert.alert("Algum erro aconteceu durante o povoamento do banco de dados!")
        })
    }
  }, [success])

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    )
  }

  if (!success) {
    return (
      <ActivityIndicator />
    )
  } else if (!started) {
    return (
      <SafeAreaProvider>
        {/* <StatusBar barStyle={"default"} /> */}
        <Text>Iniciando o aplicativo...</Text>
        <ActivityIndicator size={50} />
      </SafeAreaProvider>
    )
  }

  return (
    <>
      {/* <NavigationContainer theme={themeNavigation}> */}
        {/* <ThemeProvider theme={themePaper}> */}
          {/* <SafeAreaProvider> */}
            <GestureHandlerRootView>
              <PaperProvider
                theme={themePaper}
                settings={{
                  rippleEffectEnabled: true,
                  icon: ({ name, ...props }) => <MCIcons name={name as IconNames<typeof MCIcons>} {...props} />
                }}
              >
                <RootRoutes />
              </PaperProvider>
              {/* <StatusBar
                // barStyle={isDark ? "light-content" : "dark-content"}
                // backgroundColor={"transparent"}
                // translucent={true}
              /> */}
            </GestureHandlerRootView>
          {/* </SafeAreaProvider> */}
        {/* </ThemeProvider> */}
      {/* </NavigationContainer> */}
    </>
  );
}