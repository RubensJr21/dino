import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReceiptsTabParamList } from '../routes';
import EditInstallment, { EditInstallmentParams } from './edit';
import Home from './home';
import RegisterInstallment from './register';

export type ReceiptsInstallmentStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditInstallmentParams;
}

type Props = BottomTabScreenProps<ReceiptsTabParamList, 'ReceiptsInstallment'>

const Stack = createNativeStackNavigator<ReceiptsInstallmentStackParamList>();

export default function ReceiptsInstallmentRoutes({ }: Props) {
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