import { db, transactionsFn } from "@database/db-instance";
import { CallToast } from "@lib/call-toast";
import { MCIcons } from "@lib/icons.lib";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import migrations from "@root-project/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Tabs } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StatusBar, Text, useColorScheme, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { PaperProvider, useTheme } from 'react-native-paper';
import { populate_database } from "start_configs";

import * as blc from "@data/playground/balance";
import * as bd_fns from "@data_functions/balance_data";
import * as ba_fns from "@data_functions/bank_account";

// Configurar os componentes do pacote: react-native-paper-dates
import { addMonthsKeepingDay, diffInMonths } from "@data/playground/utils";
import { pt, registerTranslation } from 'react-native-paper-dates';
registerTranslation('pt', pt)

export default function Layout() {
  const { success, error } = useMigrations(db, migrations);
  const [started, setStarted] = useState<boolean>(false)
  useDrizzleStudio(db.$client);

  // verifyInstallation();

  const scheme = useColorScheme();
  const theme = useTheme()

  const _ = useMemo(() => {
    if (success) {
      Promise.all([
        populate_database(),
        validate_balances()
      ])
        .then(() => {
          setStarted(true)
        })
        .catch((error) => {
          CallToast("Algum erro aconteceu durante o povoamento\
          do banco de dados ou na validação dos balaços")
          console.error(error)
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
          <Tabs.Screen
            name="reports"
            options={{
              headerShown: false,
              title: 'Relatórios',
              tabBarIcon: (props) => <MCIcons name="chart-box-outline" {...props} />
            }}
          />
        </Tabs>
        <StatusBar />
        {/* <SystemBars /> */}
      </NavigationThemeProvider >
    </PaperProvider>
  )
}

async function validate_balances() {
  // ====================================
  // ALGORITMO DE COMPILAÇÃO DE SALDOS
  // ====================================
  // recupera o último mês que foi gerado o saldo
  const record = await bd_fns.get_last_compilation_date(db)
  let today = new Date()
  const base_date = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  // Se for retornado um valor undefined quer dizer que nenhum compilado foi feito, ou seja, está no início da aplicação;
  transactionsFn.begin();
  try {
    if (record === undefined) {
      // Gera balanço para cash com valores zerados
      // inicializa o last_compilation_date com o valore de base_date
      await blc.generate_balance_cash(base_date.getFullYear(), base_date.getMonth())
      await bd_fns.initialize_last_compilation_date(db, base_date)
    } else {
      // Caso seja retornada a data, será calculada a diferença de meses para verificar se tem saldos desatualizados:
      const diff_months = diffInMonths(record.last_compilation_date, base_date)
      if (diff_months === 0) {
        // Significa que os balanços já estão registrados
      } else if (diff_months >= 1) {
        // Significa que os balanços precisam ser gerados
        const banks_list = await ba_fns.get_all(db)
        for (let i = 0; i < diff_months; i++) {
          const date = addMonthsKeepingDay(record.last_compilation_date, i)
          // criar balanço do cash
          await blc.generate_balance_cash(date.getFullYear(), date.getMonth())
          for (const bank of banks_list) {
            await blc.generate_balance_bank(bank.id, date.getFullYear(), date.getMonth())
          }
        }
      }
      await bd_fns.update_last_compilation_date(db, base_date)
    }
    transactionsFn.commit()
  } catch (error) {
    transactionsFn.rollback()
    throw error;
  }
}