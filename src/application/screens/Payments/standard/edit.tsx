import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import StandardEditScreenTemplate from "@src/application/templates/screens/Standard/Edit";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { PaymentsStandardStackParamList } from "./routes";

type EditStandardProps = BottomTabScreenProps<PaymentsStandardStackParamList, 'Edit'>;

export default function EditStandard({route, navigation}: EditStandardProps) {
  const inputDescriptionRef = useRefInputDescription(route.params.description);
  const inputDatePickerRef = useRefInputDatePicker(route.params.date);
  const inputCurrencyRef = useRefInputCurrency(route.params.currency);

  const handleButton = () => {
    console.log({
      description: inputDescriptionRef.value,
      date: inputDatePickerRef.dateRef.current,
      currency: inputCurrencyRef.currencyRef.current,
    });
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