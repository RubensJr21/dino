import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InstallmentReceiptApi from "@src/application/api/drizzle.end-point/receipt.api/installment";
import InstallmentHomeScreenTemplate from "@src/application/templates/screens/Installment/Home";
import { Installment } from "@src/core/entities/installment.entity";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ReceiptsInstallmentStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsInstallmentStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const [receipts, setReceipts] = useState<Installment[]>([]);

  useEffect(() => {
    InstallmentReceiptApi.list_all().then((receiptsInstallment) => {
      if(!receiptsInstallment){
        Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
        return;
      }
      setReceipts(receiptsInstallment);
    })
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