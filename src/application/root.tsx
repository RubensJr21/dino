import { ColorSchemeName, StatusBar, useColorScheme, View } from "react-native";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { ActivityIndicator, MD3DarkTheme, MD3LightTheme, PaperProvider, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { MdiIcons, MdiNamesIcon } from "@src/application/components/ChooseIcon";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootRoutes from "./root.routes";

import migrations from "@root/drizzle/migrations";
import { db, expoDb } from "@src/infrastructure/database/client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

export default function Root() {
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

  const scheme: ColorSchemeName = useColorScheme();
  const isDark: boolean = scheme === "dark";

  if(error){
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    )
  }

  if(!success){
    return (
      <ActivityIndicator />
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
              <RootRoutes />
            </PaperProvider>
            <StatusBar barStyle={"default"} />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}