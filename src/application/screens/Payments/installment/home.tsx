import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InstallmentPaymentApi from "@src/application/api/drizzle.end-point/payment.api/installment";
import InstallmentHomeScreenTemplate from "@src/application/templates/screens/Installment/Home";
import { Installment } from "@src/core/entities/installment.entity";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { PaymentsInstallmentStackParamList } from "./routes";

type PaymentsProps = BottomTabScreenProps<PaymentsInstallmentStackParamList, 'Home'>;

export default function HomeInstallment({ navigation }: PaymentsProps) {
  const [ payments, setPaymentsInstallment ] = useState<Installment[]>([]);

  useEffect(() => {
    InstallmentPaymentApi.list_all().then((paymentsInstallment) => {
      if(!paymentsInstallment){
        Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
        return;
      }
      setPaymentsInstallment(paymentsInstallment);
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