import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ValueInstallmentEditScreenTemplate } from '@src/application/templates/screens/Installment/Edit';
import EditInstallment from './edit';
import Home from './home';
import RegisterInstallment from './register';

export type PaymentsInstallmentStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: ValueInstallmentEditScreenTemplate;
}

const Stack = createNativeStackNavigator<PaymentsInstallmentStackParamList>();

export default function PaymentsInstallmentRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Register"
        component={RegisterInstallment}
      />
      <Stack.Screen
        name="Edit"
        component={EditInstallment}
      />
    </Stack.Navigator>
  );
}