import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MdiIcons } from '@src/application/components/ChooseIcon';
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
            <MdiIcons name="cash-plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReceiptsInstallment"
        component={ReceiptsInstallmentRoutes}
        options={{
          title: 'Parcelados',
          tabBarIcon: ({ color, size }) => (
            <MdiIcons name="cash-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReceiptsRecurring"
        component={ReceiptsRecurringRoutes}
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