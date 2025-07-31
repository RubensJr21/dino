import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringPaymentApi from "@src/application/api/payment/recurring.api";
import RecurringRegisterScreenTemplate from "@src/application/templates/screens/Recurring/Register";
import { EditRecurringScreenParams as RegisterParams } from "@src/application/types/screens/RecurringScreenParams";
import { VARIANTS_OF_ITEM_VALUE } from "@src/core/shared/types/variants_items";
import { Alert } from "react-native";
import { PaymentsRecurringStackParamList } from "./routes";

type RegisterRecurringProps = BottomTabScreenProps<PaymentsRecurringStackParamList, 'Register'>;

export default function RegisterRecurring({ route, navigation }: RegisterRecurringProps) {
  const handleButton = (data: RegisterParams) => {
    console.log(data);
    console.log("Registrando recebimento recorrente...");
    RecurringPaymentApi.register({
      current_amount: data.currency,
      is_disabled: false,
      start_date: data.date,
      // ALERT: Tenho que passar as classes e não os ids
      fk_id_transfer_method: 1,
      fk_id_tag: 1,
      fk_id_recurrence_type: 1
    }).then((result) => {
      console.log(result);
      if (!result) {
        Alert.alert("Erro", "Não foi possível registrar o recebimento.");
        return;
      }
      navigation.goBack(); // Volta para a tela anterior após registrar
    })
  };
  
  return (
    <RecurringRegisterScreenTemplate
      variant={VARIANTS_OF_ITEM_VALUE.Payment}
      submitAction={handleButton}
    />
  );
}