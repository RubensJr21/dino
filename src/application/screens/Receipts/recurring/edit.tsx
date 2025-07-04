import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringEditScreenTemplate from "@src/application/components/ScreenTemplates/Recurring/Edit";
import { EditRecurringScreenParams } from "@src/application/types/screens/RecurringScreenParams";
import { ReceiptsRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Edit'>;

export default function EditRecurring({ route, navigation }: Props) {
  const handleButton = (data: EditRecurringScreenParams) => {
    console.log(data);
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <RecurringEditScreenTemplate
      variant="receipt"
      value={route.params}
      submitAction={handleButton}
    />
  );
}