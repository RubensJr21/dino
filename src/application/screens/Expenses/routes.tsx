import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MdiIcons } from '@src/application/components/ChooseIcon';
import ExpensesInstallmentRoutes from './installment/routes';
import ExpensesRecurringRoutes from './recurring/routes';
import ExpensesStandardRoutes from './standard/routes';

export type ExpensesTabParamList = {
  ExpensesStandard: undefined;
  ExpensesInstallment: undefined;
  ExpensesRecurring: undefined;
}

const Tab = createBottomTabNavigator<ExpensesTabParamList>();

export default function ExpensesRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="ExpensesStandard"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="ExpensesStandard"
        component={ExpensesStandardRoutes}
        options={{
          title: 'Pagamentos',
          tabBarIcon: ({ color, size }) => (
            <MdiIcons name="cash-minus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ExpensesInstallment"
        component={ExpensesInstallmentRoutes}
        options={{
          title: 'Parcelados',
          tabBarIcon: ({ color, size }) => (
            <MdiIcons name="cash-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ExpensesRecurring"
        component={ExpensesRecurringRoutes}
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
