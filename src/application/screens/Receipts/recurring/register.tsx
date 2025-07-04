import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringRegisterScreenTemplate from "@src/application/components/ScreenTemplates/Recurring/Register";
import { EditRecurringScreenParams as RegisterParams } from "@src/application/types/screens/RecurringScreenParams";
import { ReceiptsRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Register'>;

export default function RegisterRecurring({ route, navigation }: Props) {
  const handleButton = (data: RegisterParams) => {
      console.log(data);
      navigation.goBack(); // Volta para a tela anterior após registrar
    };
    
    return (
      <RecurringRegisterScreenTemplate
        variant="receipt"
        submitAction={handleButton}
      />
    );
}