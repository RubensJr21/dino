import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MCIcons } from '@src/application/components/Icons.lib';
import ReceiptsInstallmentRoutes from './installment/routes';
import ReceiptsRecurringRoutes from './recurring/routes';
import ReceiptsStandardRoutes from './standard/routes';

export type ReceiptsTabParamList = {
  ReceiptsStandard: undefined;
  ReceiptsInstallment: undefined;
  ReceiptsRecurring: undefined;
}

const Tab = createBottomTabNavigator<ReceiptsTabParamList>();

export default function ReceiptsRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="ReceiptsStandard"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="ReceiptsStandard"
        component={ReceiptsStandardRoutes}
        options={{
          title: 'Recebimentos',
          tabBarIcon: ({ color, size }) => (
            <MCIcons name="cash-plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReceiptsInstallment"
        component={ReceiptsInstallmentRoutes}
        options={{
          title: 'Parcelados',
          tabBarIcon: ({ color, size }) => (
            <MCIcons name="credit-card-multiple-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReceiptsRecurring"
        component={ReceiptsRecurringRoutes}
        options={{
          title: 'Recorrentes',
          tabBarIcon: ({ color, size }) => (
            <MCIcons name="credit-card-clock-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};