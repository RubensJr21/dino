import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import PaymentInstallmentApi from "@src/application/api/payment/installment.api";
import InstallmentHomeScreenTemplate from "@src/application/templates/screens/Installment/Home";
import { Installment } from "@src/core/entities/installment.entity";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { PaymentsInstallmentStackParamList } from "./routes";

type PaymentsProps = BottomTabScreenProps<PaymentsInstallmentStackParamList, 'Home'>;

export default function HomeInstallment({ navigation }: PaymentsProps) {
  const [ payments, setPaymentsInstallment ] = useState<Installment[]>([]);

  useEffect(() => {
    PaymentInstallmentApi.list_all.execute().then((paymentsInstallment) => {
      setPaymentsInstallment(paymentsInstallment);
    }).catch((error) => {
      console.error("Erro ao buscar recebimentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
    });
  }, []);

  return (
    <InstallmentHomeScreenTemplate
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