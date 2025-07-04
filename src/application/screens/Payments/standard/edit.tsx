import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useRefInputCurrency } from "@src/application/components/Input/Currency/InputCurrency";
import { useRefInputDatePicker } from "@src/application/components/Input/InputDatePicker";
import { useRefInputDescription } from "@src/application/components/Input/InputDescription";
import StandardEditScreenTemplate from "@src/application/components/ScreenTemplates/Standard/Edit";
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
      variant="payment"
      value={route.params}
      submitAction={handleButton}
    />
  );
}