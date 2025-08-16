import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ValueRecurringEditScreenTemplate } from '@src/application/templates/screens/Recurring/Edit';
import { DetailsRecurringScreenParams } from '@src/application/templates/screens/types/RecurringScreenParams';
import { ReceiptsTabParamList } from '../routes';
import DetailsRecurring from './details';
import EditRecurring from './edit';
import Home from './home';
import RegisterRecurring from './register';

export type ReceiptsRecurringStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: ValueRecurringEditScreenTemplate;
  Details: DetailsRecurringScreenParams;
}

type Props = BottomTabScreenProps<ReceiptsTabParamList, 'ReceiptsRecurring'>

const Stack = createNativeStackNavigator<ReceiptsRecurringStackParamList>();

export default function ReceiptsRecurringRoutes({ }: Props) {
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