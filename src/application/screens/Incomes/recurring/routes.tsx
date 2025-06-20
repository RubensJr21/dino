import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IncomesTabParamList } from '../routes';
import EditRecurring, { EditRecurringParams } from './edit';
import Home from './home';
import RegisterRecurring from './register';

export type IncomesRecurringStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditRecurringParams;
}

type Props = BottomTabScreenProps<IncomesTabParamList, 'IncomesRecurring'>

const Stack = createNativeStackNavigator<IncomesRecurringStackParamList>();

export default function IncomesRecurringRoutes({}: Props) {
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
    </Stack.Navigator>
  );
}