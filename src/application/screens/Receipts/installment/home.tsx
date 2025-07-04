import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ReceiptInstallmentApi from "@src/application/api/receipt/installment.api";
import InstallmentHomeScreenTemplate from "@src/application/components/ScreenTemplates/Installment/Home";
import { Installment } from "@src/core/entities/installment.entity";
import { ReceiptsInstallmentStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsInstallmentStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const [receipts, setReceipts] = useState<Installment[]>([]);

  useEffect(() => {
    ReceiptInstallmentApi.list_all.execute().then((receiptsInstallment) => {
      setReceipts(receiptsInstallment);
    }).catch((error) => {
      console.error("Erro ao buscar recebimentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
    });
  }, []);

  return (
    <InstallmentHomeScreenTemplate
      data={receipts}
      navigateToEditPage={(receipt) => {
        navigation.navigate("Edit", receipt);
      }}
      fabAction={() => {
        navigation.navigate("Register");
      }}
    />
  );
}