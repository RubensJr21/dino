import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IncomesTabParamList } from '../routes';
import EditInstallment, { EditInstallmentParams } from './edit';
import Home from './home';
import RegisterInstallment from './register';

export type IncomesInstallmentStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditInstallmentParams;
}

type Props = BottomTabScreenProps<IncomesTabParamList, 'IncomesInstallment'>

const Stack = createNativeStackNavigator<IncomesInstallmentStackParamList>();

export default function IncomesInstallmentRoutes({ }: Props) {
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