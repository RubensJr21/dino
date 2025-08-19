import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringEditScreenTemplate, { ValueRecurringEditScreenTemplate } from "@src/application/templates/screens/Recurring/Edit";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { ReceiptsRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Edit'>;

export default function EditRecurring({ route, navigation }: Props) {
  const handleButton = (data: ValueRecurringEditScreenTemplate) => {
    // TODO: Implementar chamada ao endpoint de edição
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <RecurringEditScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Receipt}
      value={route.params}
      submitAction={handleButton}
    />
  );
}