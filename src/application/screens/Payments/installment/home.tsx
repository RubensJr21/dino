import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InstallmentPaymentApi from "@src/application/api/drizzle.end-point/payment.api/installment";
import InstallmentHomeScreenTemplate, { InstallmentHomeScreenTemplateProps } from "@src/application/templates/screens/Installment/Home";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { PaymentsInstallmentStackParamList } from "./routes";

type PaymentsProps = BottomTabScreenProps<PaymentsInstallmentStackParamList, 'Home'>;

type DataItem = InstallmentHomeScreenTemplateProps["data"][number];

export default function HomeInstallment({ navigation }: PaymentsProps) {
  const [payments, setPaymentsInstallment] = useState<DataItem[]>([]);

  useEffect(() => {
    InstallmentPaymentApi.list_all().then(async (receiptsInstallment) => {
      if (!receiptsInstallment) {
        Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
        return;
      }

      const data: DataItem[] = [];

      for (const receipt of receiptsInstallment) {
        const items = await InstallmentPaymentApi.list_all_items({ installment_id: receipt.id })

        if (!items) {
          Alert.alert("Erro", "Não foi possível carregar os itens do recebimento.");
          return navigation.goBack();
        }

        data.push({
          installment: receipt,
          items
        });
      }

      setPaymentsInstallment(data);
    })
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