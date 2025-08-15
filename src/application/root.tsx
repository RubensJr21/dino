import { Alert, ColorSchemeName, StatusBar, useColorScheme, View } from "react-native";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { ActivityIndicator, MD3DarkTheme, MD3LightTheme, PaperProvider, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Entypo, type IconNames } from "@src/application/components/Icons.lib";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootRoutes from "./root.routes";

import migrations from "@root/drizzle/migrations";
import { populate_database } from "@src/core/start_configs";
import { db, expoDb } from "@src/infrastructure/database/client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useMemo, useState } from "react";

export default function Root() {
  const { success, error } = useMigrations(db, migrations);
  const [started, setStarted] = useState<boolean>(false)
  useDrizzleStudio(expoDb);

  const scheme: ColorSchemeName = useColorScheme();
  const isDark: boolean = scheme === "dark";


  const _ = useMemo(() => {
    if(success) {
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
    <NavigationContainer>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <PaperProvider
              theme={isDark ? MD3DarkTheme : MD3LightTheme}
              settings={{
                icon: ({ name, ...props }) => <Entypo name={name as IconNames<typeof Entypo>} {...props} />
              }}
            >
              <RootRoutes />
            </PaperProvider>
            <StatusBar
              barStyle={isDark ? "light-content" : "dark-content"}
              backgroundColor={"transparent"}
              translucent={true}
            />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}