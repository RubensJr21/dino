import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringReceiptApi from "@src/application/api/receipt/recurring.api";
import RecurringRegisterScreenTemplate, { ValueRecurringRegisterScreenTemplate } from "@src/application/templates/screens/Recurring/Register";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { Alert } from "react-native";
import { ReceiptsRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Register'>;

export default function RegisterRecurringReceipt({ route, navigation }: Props) {
  const handleButton = (data: ValueRecurringRegisterScreenTemplate) => {
    RecurringReceiptApi.register({
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
      variant={VARIANTS_OF_ITEM_VALUE.Receipt}
      submitAction={handleButton}
    />
  );
}