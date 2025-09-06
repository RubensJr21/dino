import { populate_database } from "@configs/start_configs";
import { CallToast } from "@lib/call-toast";
import { MCIcons } from "@lib/icons.lib";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import migrations from "@root-project/drizzle/migrations";
import { db, expoDb } from "@server/infrastructure/database/drizzle/client";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Tabs } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StatusBar, Text, useColorScheme, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { PaperProvider, useTheme } from 'react-native-paper';

// Configurar os componentes do pacote: react-native-paper-dates
import { pt, registerTranslation } from 'react-native-paper-dates';
registerTranslation('pt', pt)

export default function Layout() {
  const { success, error } = useMigrations(db, migrations);
  const [started, setStarted] = useState<boolean>(false)
  useDrizzleStudio(expoDb);

  // verifyInstallation();

  const scheme = useColorScheme();
  const theme = useTheme()

  // console.info('Nativewind color scheme:', );
  // console.info('React Native color scheme:', useNativeColorScheme());

  const _ = useMemo(() => {
    if (success) {
      populate_database()
        .then(() => {
          setStarted(true)
        })
        .catch(() => {
          CallToast("Algum erro aconteceu durante o povoamento do banco de dados!")
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
      <>
        <Text>Iniciando o aplicativo...</Text>
        <ActivityIndicator size={50} />
        <StatusBar />
        <SystemBars />
      </>
    )
  }

  const NavigationDarkThemeCustom = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      // Cor dos botões e usada como cor do 'tabBarActiveTintColor'
      primary: theme.colors.secondaryContainer
    }
  } satisfies typeof NavigationDarkTheme

  const NavigationDefaultThemeCustom = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      // Cor dos botões e usada como cor do 'tabBarActiveTintColor'
      primary: theme.colors.secondaryContainer
    }
  } satisfies typeof NavigationDefaultTheme

  return (
    <PaperProvider
      settings={{
        rippleEffectEnabled: true,
        icon: (props) => <MCIcons {...props} />,
      }}
    >
      <NavigationThemeProvider
        value={scheme === "dark" ? NavigationDarkThemeCustom : NavigationDefaultThemeCustom}
      >
        <Tabs
          initialRouteName="index"
          screenOptions={{
            // tabBarHideOnKeyboard: true,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Início',
              tabBarIcon: (props) => <MCIcons name="home" {...props} />
            }}
          />
          {/* <Tabs.Screen
        name="receipts"
        options={{
          headerShown: false
          }}
          /> */}
          <Tabs.Screen
            name="payments"
            options={{
              headerShown: false,
              title: "Pagamentos",
              tabBarIcon: (props) => <MCIcons name="cash-minus" {...props} />
            }}
          />
          <Tabs.Screen
            name="manage"
            options={{
              headerShown: false,
              title: 'Gerenciar',
              tabBarIcon: (props) => <MCIcons name="wallet-outline" {...props} />
            }}
          />
        </Tabs>
        <StatusBar />
        {/* <SystemBars /> */}
      </NavigationThemeProvider >
    </PaperProvider>
  )
}