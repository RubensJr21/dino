import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringEditScreenTemplate from "@src/application/components/ScreenTemplates/Recurring/Edit";
import { EditRecurringScreenParams } from "@src/application/types/screens/RecurringScreenParams";
import { PaymentsRecurringStackParamList } from "./routes";

type EditRecurringProps = BottomTabScreenProps<PaymentsRecurringStackParamList, 'Edit'>;

export default function EditRecurring({route, navigation}: EditRecurringProps) {
  const handleButton = (data: EditRecurringScreenParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <RecurringEditScreenTemplate
      variant="payment"
      value={route.params}
      submitAction={handleButton}
    />
  );
}