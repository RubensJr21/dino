import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringEditScreenTemplate, { ValueRecurringEditScreenTemplate } from "@src/application/templates/screens/Recurring/Edit";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { PaymentsRecurringStackParamList } from "./routes";

type EditRecurringProps = BottomTabScreenProps<PaymentsRecurringStackParamList, 'Edit'>;

export default function EditRecurring({route, navigation}: EditRecurringProps) {
  const handleButton = (data: ValueRecurringEditScreenTemplate) => {
    console.info(data);
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <RecurringEditScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Payment}
      value={route.params}
      submitAction={handleButton}
    />
  );
}