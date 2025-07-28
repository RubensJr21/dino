import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringPaymentApi from "@src/application/api/payment/recurring.api";
import RecurringHomeScreenTemplate from "@src/application/templates/screens/Recurring/Home";
import { Recurring } from "@src/core/entities/recurring.entity";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { PaymentsRecurringStackParamList } from "./routes";

type PaymentsProps = BottomTabScreenProps<PaymentsRecurringStackParamList, 'Home'>;

export default function HomeRecurring({ navigation }: PaymentsProps) {
  const [payments, setPayments] = useState<Recurring[]>([]);

  useEffect(() => {
    RecurringPaymentApi.list_all().then((payments_recurring) => {
      if(!payments_recurring){
        Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
        return;
      }
      setPayments(payments_recurring);
    })
  }, []);

  return (
    <RecurringHomeScreenTemplate
      data={payments}
      navigateToEditPage={(payment) => {
        navigation.navigate("Edit", payment);
      }}
      fabAction={() => {
        navigation.navigate("Register");
      }}
    />
  );
}