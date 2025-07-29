import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InstallmentReceiptApi from "@src/application/api/drizzle.end-point/receipt.api/installment";
import InstallmentHomeScreenTemplate, { InstallmentHomeScreenTemplateProps } from "@src/application/templates/screens/Installment/Home";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ReceiptsInstallmentStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsInstallmentStackParamList, 'Home'>;

type DataItem = InstallmentHomeScreenTemplateProps["data"][number];

export default function Home({ navigation }: Props) {
  const [receipts, setReceiptsInstallment] = useState<DataItem[]>([]);

  useEffect(() => {
    InstallmentReceiptApi.list_all().then(async (receiptsInstallment) => {
      if(!receiptsInstallment){
        Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
        return;
      }

      const data: DataItem[] = [];

      for (const receipt of receiptsInstallment) {
        const items = await InstallmentReceiptApi.list_all_items({installment_id: receipt.id})
        
        if(!items){
          Alert.alert("Erro", "Não foi possível carregar os itens do recebimento.");
          return navigation.goBack();
        }

        data.push({
          installment: receipt,
          items
        });
      }

      setReceiptsInstallment(data);
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