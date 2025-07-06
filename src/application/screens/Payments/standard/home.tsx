import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import PaymentApi from "@src/application/api/payment/standard.api";
import { GroupedStandardByDate, groupStandardByDate } from "@src/application/functions/groupStandardByDate";
import StandardHomeScreenTemplate from "@src/application/templates/screens/Standard/Home";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { PaymentsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<PaymentsStandardStackParamList, 'Home'>;

export default function Payments({ navigation }: Props) {
  const [payments, setPayments] = useState<GroupedStandardByDate[]>([]);

  useEffect(() => {
    PaymentApi.list_all.execute().then((payments) => {
      setPayments(groupStandardByDate(payments));
    }).catch((error) => {
      console.error("Erro ao buscar pagamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os pagamentos.");
    });
  }, []);

  return (
    <StandardHomeScreenTemplate
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