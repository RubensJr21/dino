import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import StandardEditScreenTemplate from "@src/application/templates/screens/Standard/Edit";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { PaymentsStandardStackParamList } from "./routes";

type EditStandardProps = BottomTabScreenProps<PaymentsStandardStackParamList, 'Edit'>;

// ALERT: Preciso receber apenas o id

export default function EditStandard({route, navigation}: EditStandardProps) {
  const inputDescriptionRef = useRefInputDescription(route.params.description);
  const inputDatePickerRef = useRefInputDatePicker(route.params.scheduled_at);
  const inputCurrencyRef = useRefInputCurrency(route.params.amount);

  const handleButton = () => {
    // TODO: Implementar chamada ao endpoint de edição
    navigation.goBack(); // Volta para a tela anterior após editar
  };

  return (
    <StandardEditScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Payment}
      value={route.params}
      submitAction={handleButton}
    />
  );
}