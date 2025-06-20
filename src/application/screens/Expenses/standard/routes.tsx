import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditStandard, { EditStandardParams } from './edit';
import Expenses from './home';
import RegisterStandard from './register';

export type ExpensesStandardStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditStandardParams;
}

const Stack = createNativeStackNavigator<ExpensesStandardStackParamList>();

export default function ExpensesStandardRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Expenses}
      />
      <Stack.Screen
        name="Register"
        component={RegisterStandard}
      />
      <Stack.Screen
        name="Edit"
        component={EditStandard}
      />
    </Stack.Navigator>
  );
}