import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IncomesTabParamList } from '../routes';
import EditStandard, { EditStandardParams } from './edit';
import Incomes from './home';
import RegisterStandard from './register';

export type IncomesStandardStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditStandardParams;
}

type Props = BottomTabScreenProps<IncomesTabParamList, 'IncomesStandard'>

const Stack = createNativeStackNavigator<IncomesStandardStackParamList>();

export default function IncomesStandardRoutes({}: Props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Incomes}
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