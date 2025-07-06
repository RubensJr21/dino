import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringRegisterScreenTemplate from "@src/application/templates/screens/Recurring/Register";
import { EditRecurringScreenParams as RegisterParams } from "@src/application/types/screens/RecurringScreenParams";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { PaymentsRecurringStackParamList } from "./routes";

type RegisterRecurringProps = BottomTabScreenProps<PaymentsRecurringStackParamList, 'Register'>;

export default function RegisterRecurring({ route, navigation }: RegisterRecurringProps) {
  const handleButton = (data: RegisterParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após registrar
  };
  
  return (
    <RecurringRegisterScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Payment}
      submitAction={handleButton}
    />
  );
}