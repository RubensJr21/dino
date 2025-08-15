import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MCIcons } from '@src/application/components/Icons.lib';
import PaymentsInstallmentRoutes from './installment/routes';
import PaymentsRecurringRoutes from './recurring/routes';
import PaymentsStandardRoutes from './standard/routes';

export type PaymentsTabParamList = {
  PaymentsStandard: undefined;
  PaymentsInstallment: undefined;
  PaymentsRecurring: undefined;
}

const Tab = createBottomTabNavigator<PaymentsTabParamList>();

export default function PaymentsRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="PaymentsStandard"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="PaymentsStandard"
        component={PaymentsStandardRoutes}
        options={{
          title: 'Pagamentos',
          tabBarIcon: ({ color, size }) => (
            <MCIcons name="cash-minus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PaymentsInstallment"
        component={PaymentsInstallmentRoutes}
        options={{
          title: 'Parcelados',
          tabBarIcon: ({ color, size }) => (
            <MCIcons name="credit-card-multiple-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PaymentsRecurring"
        component={PaymentsRecurringRoutes}
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
