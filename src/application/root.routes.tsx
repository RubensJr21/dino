import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStaticNavigation, DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme, StaticParamList
} from '@react-navigation/native';
import React from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme
} from "react-native-paper";
import { MCIcons } from './components/Icons.lib';
import Home from './screens/Home';
import ManageRoutes from './screens/Manage/routes';
import PaymentsRoutes from './screens/Payments/routes';
import { ReceiptsTabRoutes } from './screens/Receipts/routes';

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

export type RootDrawerParamList = {
  Home: undefined;
  Receipts: undefined;
  Payments: undefined;
  Manage: undefined;
}

export const ID_NAVIGATOR_ROOT = "DrawerRoot" as const

// ALERT: PRECISO COMPOR TIPAGEM DOS PROPS DOS FILHOS
const Drawer = createDrawerNavigator<RootDrawerParamList, typeof ID_NAVIGATOR_ROOT>();

const DrawerRoot = createDrawerNavigator<RootDrawerParamList, typeof ID_NAVIGATOR_ROOT>({
  id: ID_NAVIGATOR_ROOT,
  initialRouteName: "Home",
  screens: {
    Home: {
      screen: Home,
      options: ({ route }) => ({
        drawerIcon(props) {
          return <MCIcons name="home" {...props} />
        }
      }),
    },
    Receipts: {
      screen: ReceiptsTabRoutes,
      options: ({ route }) => ({
        title: "Recebimentos",
        drawerIcon(props) {
          return <MCIcons name="cash-plus" {...props} />
        },
      })
    },
    Payments: {
      screen: PaymentsRoutes,
      options: ({ route }) => ({
        title: "Pagamentos",
        drawerIcon(props) {
          return <MCIcons name="cash-minus" {...props} />
        },
      })
    },
    Manage: {
      screen: ManageRoutes,
      options: ({ route }) => ({
        title: "Gerenciar",
        drawerIcon(props) {
          return <MCIcons name="wallet-outline" {...props}/>
        }
      })
    }
  }
})

export const Navigation = createStaticNavigation(DrawerRoot)

export default function DrawerRoutes() {
  const scheme: ColorSchemeName = useColorScheme();
  const isDark: boolean = scheme === "dark";
  const themeNavigation = isDark ? RNavigationDarkTheme : RNavigationDefaultTheme;
  return <Navigation theme={themeNavigation} />
}

type RootStackParamList = StaticParamList<typeof DrawerRoot>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}