import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ReceiptRecurringApi from "@src/application/api/receipt/recurring.api";
import RecurringHomeScreenTemplate from "@src/application/components/ScreenTemplates/Recurring/Home";
import { Recurring } from "@src/core/entities/recurring.entity";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ReceiptsRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const [receipts, setReceipts] = useState<Recurring[]>([]);

  useEffect(() => {
    ReceiptRecurringApi.list_all.execute().then((receipts_recurring) => {
      setReceipts(receipts_recurring);
    }).catch((error) => {
      console.error("Erro ao buscar recebimentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
    });
  }, []);

  return (
    <RecurringHomeScreenTemplate
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