import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringRegisterScreenTemplate from "@src/application/ScreenTemplates/Recurring/Register";
import { EditRecurringScreenParams as RegisterParams } from "@src/application/types/screens/RecurringScreenParams";
import { PaymentsRecurringStackParamList } from "./routes";

type RegisterRecurringProps = BottomTabScreenProps<PaymentsRecurringStackParamList, 'Register'>;

export default function RegisterRecurring({ route, navigation }: RegisterRecurringProps) {
  const handleButton = (data: RegisterParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após registrar
  };
  
  return (
    <RecurringRegisterScreenTemplate
      variant="payment"
      submitAction={handleButton}
    />
  );
}