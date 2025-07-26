import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
// ATTENTION: Preciso trocar a importação do PaymentApi para ReceiptApi
// import ReceiptApi from "@src/application/api/receipt/standard.api";
import ReceiptApi from "@src/application/api/drizzle/payment/standard";
import { GroupedStandardByDate, groupStandardByDate } from "@src/application/functions/groupStandardByDate";
import StandardHomeScreenTemplate from "@src/application/templates/screens/Standard/Home";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ReceiptsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsStandardStackParamList, 'Home'>;

export default function Receipts({ navigation }: Props) {
  const [receipts, setReceipts] = useState<GroupedStandardByDate[]>([]);

  useEffect(() => {
    ReceiptApi.list_all().then((receipts) => {
      if(receipts === undefined) {
        Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
        return;
      }
      setReceipts(groupStandardByDate(receipts));
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    /* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
    O atributo a ser utilizado é a descrição ou valores.
    posteriormente será feita um filtro
     */
  }, [searchQuery]);

  return (
    <StandardHomeScreenTemplate
      data={receipts}
      {...{ searchQuery, setSearchQuery }}
      navigateToEditPage={(receipt) => {
        navigation.navigate("Edit", {
          id: receipt.id,
          description: receipt.description,
          date: receipt.date,
          currency: receipt.currency,
          tag: receipt.tag
        });
      }}
      fabAction={() => {
        navigation.navigate("Register");
      }}
    />
  );
}