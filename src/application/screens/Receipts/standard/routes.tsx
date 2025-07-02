import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReceiptsTabParamList } from '../routes';
import EditStandard, { EditStandardParams } from './edit';
import Receipts from './home';
import RegisterStandard from './register';

export type ReceiptsStandardStackParamList = {
  Home: undefined;
  Register: undefined;
  Edit: EditStandardParams;
}

type Props = BottomTabScreenProps<ReceiptsTabParamList, 'ReceiptsStandard'>

const Stack = createNativeStackNavigator<ReceiptsStandardStackParamList>();

export default function ReceiptsStandardRoutes({}: Props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Receipts}
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