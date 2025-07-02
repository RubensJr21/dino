import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditStandard, { EditStandardParams } from './edit';
import Payments from './home';
import RegisterStandard from './register';

export type PaymentsStandardStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditStandardParams;
}

const Stack = createNativeStackNavigator<PaymentsStandardStackParamList>();

export default function PaymentsStandardRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Payments}
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