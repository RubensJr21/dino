import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditInstallment, { EditInstallmentParams } from './edit';
import Home from './home';
import RegisterInstallment from './register';

export type ExpensesInstallmentStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditInstallmentParams;
}

const Stack = createNativeStackNavigator<ExpensesInstallmentStackParamList>();

export default function ExpensesInstallmentRoutes() {
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