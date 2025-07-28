import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import RecurringReceiptApi from "@src/application/api/drizzle.end-point/receipt.api/recurring";
import RecurringHomeScreenTemplate from "@src/application/templates/screens/Recurring/Home";
import { Recurring } from "@src/core/entities/recurring.entity";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ReceiptsRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const [receipts, setReceipts] = useState<Recurring[]>([]);

  useEffect(() => {
    RecurringReceiptApi.list_all().then((receipts_recurring) => {
      if(!receipts_recurring){
        Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
        return;
      }
      setReceipts(receipts_recurring);
    })
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