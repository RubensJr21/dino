import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ValueInstallmentEditScreenTemplate } from '@src/application/templates/screens/Installment/Edit';
import { HomeInstallmentScreenParams, RegisterInstallmentScreenParams } from '@src/application/templates/screens/types/InstallmentScreenParams';
import { ReceiptsTabParamList } from '../routes';
import EditInstallment from './edit';
import Home from './home';
import RegisterInstallment from './register';

export type ReceiptsInstallmentStackParamList = {
  Home: HomeInstallmentScreenParams;
  Register: RegisterInstallmentScreenParams;
  Edit: ValueInstallmentEditScreenTemplate;
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