import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditRecurringScreenParams } from '@src/application/types/screens/RecurringScreenParams';
import { ReceiptsTabParamList } from '../routes';
import EditRecurring from './edit';
import Home from './home';
import RegisterRecurring from './register';

export type ReceiptsRecurringStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditRecurringScreenParams;
}

type Props = BottomTabScreenProps<ReceiptsTabParamList, 'ReceiptsRecurring'>

const Stack = createNativeStackNavigator<ReceiptsRecurringStackParamList>();

export default function ReceiptsRecurringRoutes({}: Props) {
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