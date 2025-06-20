import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MdiIcons } from '@src/application/components/ChooseIcon';
import IncomesInstallmentRoutes from './installment/routes';
import IncomesRecurringRoutes from './recurring/routes';
import IncomesStandardRoutes from './standard/routes';

export type IncomesTabParamList = {
  IncomesStandard: undefined;
  IncomesInstallment: undefined;
  IncomesRecurring: undefined;
}

const Tab = createBottomTabNavigator<IncomesTabParamList>();

export default function IncomesRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="IncomesStandard"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="IncomesStandard"
        component={IncomesStandardRoutes}
        options={{
          title: 'Recebimentos',
          tabBarIcon: ({ color, size }) => (
            <MdiIcons name="cash-plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="IncomesInstallment"
        component={IncomesInstallmentRoutes}
        options={{
          title: 'Parcelados',
          tabBarIcon: ({ color, size }) => (
            <MdiIcons name="cash-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="IncomesRecurring"
        component={IncomesRecurringRoutes}
        options={{
          title: 'Recorrentes',
          tabBarIcon: ({ color, size }) => (
            <MdiIcons name="cash-sync" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};