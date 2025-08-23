import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import StandardReceiptApi from "@src/application/api/drizzle.end-point/receipt.api/standard";
import { GroupedStandardByDate, groupStandardByDate } from "@src/application/functions/groupStandardByDate";
import StandardHomeScreenTemplate from "@src/application/templates/screens/Standard/Home";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ReceiptsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsStandardStackParamList, 'Home'>;

export default function Receipts({ navigation }: Props) {
  // ALERT: QUERO MUDAR AQUI O VALOR DO HEADER TITLE
  const [receipts, setReceipts] = useState<GroupedStandardByDate[]>([]);

  useEffect(() => {
    StandardReceiptApi.list_all().then((receipts) => {
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
        navigation.navigate("Edit", receipt);
      }}
      fabAction={() => {
        navigation.navigate("Register");
      }}
    />
  );
}