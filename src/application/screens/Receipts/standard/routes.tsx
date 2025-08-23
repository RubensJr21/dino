import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ValueFormEditTemplate } from '@src/application/templates/FormEditTemplate';
import { HomeStandardScreenParams } from '@src/application/templates/screens/types/StandardScreenParams';
import EditStandard from './edit';
import Receipts from './home';
import RegisterStandard from './register';

export type ReceiptsStandardStackParamList = {
  Home: HomeStandardScreenParams;
  Register: undefined;
  Edit: ValueFormEditTemplate;
}

// type Props = BottomTabScreenProps<ReceiptsTabParamList, 'ReceiptsStandard'>

export const ReceiptsStandardRoutes = createNativeStackNavigator<ReceiptsStandardStackParamList, "ReceiptsStandardStack">({
  id: "ReceiptsStandardStack",
  initialRouteName: "Home",
  screens: {
    Home: Receipts,
    Register: RegisterStandard,
    Edit: EditStandard
  }
});