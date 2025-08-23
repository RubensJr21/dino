import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MCIcons } from '@src/application/components/Icons.lib';
import ReceiptsInstallmentRoutes from './installment/routes';
import ReceiptsRecurringRoutes from './recurring/routes';
import { ReceiptsStandardRoutes } from './standard/routes';

export type ReceiptsTabParamList = {
  Standard: undefined;
  Installment: undefined;
  Recurring: undefined;
}

export const ReceiptsTabRoutes = createBottomTabNavigator<ReceiptsTabParamList, "ReceiptsTabRoutes">({
  id: "ReceiptsTabRoutes",
  screenOptions: {
    headerShown: false
  },
  screens: {
    Standard: {
      screen: ReceiptsStandardRoutes,
      options: {
        title: 'Recebimentos',
        tabBarIcon: ({ color, size }) => (
          <MCIcons name="cash-plus" color={color} size={size} />
        ),
      }
    },
    Installment: {
      screen: ReceiptsInstallmentRoutes,
      options: {
        title: 'Parcelados',
        tabBarIcon: ({ color, size }) => (
          <MCIcons name="credit-card-multiple-outline" color={color} size={size} />
        ),
      }
    },
    Recurring: {
      screen: ReceiptsRecurringRoutes,
      options: {
        title: 'Recorrentes',
        tabBarIcon: ({ color, size }) => (
          <MCIcons name="credit-card-clock-outline" color={color} size={size} />
        ),
      }
    }
  }
});