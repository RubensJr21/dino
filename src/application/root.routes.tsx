import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

export type RootTabParamList = {
  Home: undefined;
  Incomes: undefined;
  Expenses: undefined;
  Manage: undefined;
}

const Drawer = createDrawerNavigator<RootTabParamList>();

import { MdiIcons } from './components/ChooseIcon';
import Expenses from './screens/Expenses';
import Home from './screens/Home';
import Incomes from './screens/Incomes';
import Manage from './screens/Manage';

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
						<MdiIcons
							name="home"
							{...props}
						/>
					),
        }}
      />
      <Drawer.Screen
        name="Incomes"
        component={Incomes}
        options={{
          title: 'Recebimentos',
          drawerIcon: (props) => (
						<MdiIcons
							name="cash-plus"
							{...props}
						/>
					),
        }}
      />
      <Drawer.Screen
        name="Expenses"
        component={Expenses}
        options={{
          title: 'Pagamentos',
          drawerIcon: (props) => (
						<MdiIcons
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
            <MdiIcons
              name="view-dashboard-edit"
              {...props}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}