import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

export type RootTabParamList = {
  Home: undefined;
  Receipts: undefined;
  Payments: undefined;
  Manage: undefined;
}

const Drawer = createDrawerNavigator<RootTabParamList>();

import { MCIcons } from './components/Icons.lib';
import Home from './screens/Home';
import Manage from './screens/Manage';
import Payments from './screens/Payments';
import Receipts from './screens/Receipts';

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
				// drawerHideOnKeyboard: true,
				// headerShown: false,
			}}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          drawerIcon: (props) => (
						<MCIcons
							name="home"
							{...props}
						/>
					),
        }}
      />
      <Drawer.Screen
        name="Receipts"
        component={Receipts}
        options={{
          title: 'Recebimentos',
          drawerIcon: (props) => (
						<MCIcons
							name="cash-plus"
							{...props}
						/>
					),
        }}
      />
      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{
          title: 'Pagamentos',
          drawerIcon: (props) => (
						<MCIcons
							name="cash-minus"
							{...props}
						/>
					),
        }}
      />
      <Drawer.Screen
        name="Manage"
        component={Manage}
        options={{
          title: 'Gerenciar',
          drawerIcon: (props) => (
            <MCIcons
              name="wallet-outline"
              {...props}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}