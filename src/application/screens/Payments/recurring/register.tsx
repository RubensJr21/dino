import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringPaymentApi from "@src/application/api/payment/recurring.api";
import RecurringRegisterScreenTemplate, { ValueRecurringRegisterScreenTemplate } from "@src/application/templates/screens/Recurring/Register";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { Alert } from "react-native";
import { PaymentsRecurringStackParamList } from "./routes";

type RegisterRecurringProps = BottomTabScreenProps<PaymentsRecurringStackParamList, 'Register'>;

export default function RegisterRecurring({ route, navigation }: RegisterRecurringProps) {
  const handleButton = (data: ValueRecurringRegisterScreenTemplate) => {
    RecurringPaymentApi.register({
      description: data.description,
      current_amount: data.amount,
      is_disabled: false,
      start_date: data.scheduled_at,
      transfer_method_id: data.transfer_method_id,
      tag_description: data.tag_description,
      recurrence_type: data.recurrence_type,
    }).then((result) => {
      if (!result) {
        Alert.alert("Erro", "Não foi possível registrar o pagamento.");
        return;
      }
      navigation.goBack(); // Volta para a tela anterior após registrar
    }).catch((error) => {
      console.error("Erro ao registrar pagamento recorrente:", error);
      Alert.alert("Erro", "Não foi possível registrar o pagamento.");
    })
  };
  
  return (
    <RecurringRegisterScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Payment}
      submitAction={handleButton}
    />
  );
}