import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsRecurringScreenParams, EditRecurringScreenParams, HomeRecurringScreenParams, RegisterRecurringScreenParams } from '@src/application/types/screens/RecurringScreenParams';
import DetailsRecurring from './details';
import EditRecurring from './edit';
import Home from './home';
import RegisterRecurring from './register';

export type PaymentsRecurringStackParamList = {
  Home: HomeRecurringScreenParams;
  Register: RegisterRecurringScreenParams;
  Edit: EditRecurringScreenParams;
  Details: DetailsRecurringScreenParams;
}

const Stack = createNativeStackNavigator<PaymentsRecurringStackParamList>();

export default function PaymentsRecurringRoutes() {
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
        component={RegisterRecurring}
      />
      <Stack.Screen
        name="Edit"
        component={EditRecurring}
      />
      <Stack.Screen
        name="Details"
        component={DetailsRecurring}
      />
    </Stack.Navigator>
  );
}