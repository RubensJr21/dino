import BaseView from "@src/application/components/BaseView";
import { MdiIcons } from "@src/application/components/ChooseIcon";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import {
  Searchbar,
  Text,
  useTheme
} from "react-native-paper";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import PaymentApi from "@src/application/api/payment/standard.api";
import Fab from "@src/application/components/Fab";
import { FlatListDivider } from "@src/application/components/FlatList/FlatListDivider";
import { DateString } from "@src/application/functions/date2String";
import { GroupedStandardByDate, groupStandardByDate } from "@src/application/functions/groupStandardByDate";
import StandardGroupedByDate from "../../Receipts/standard/components/StandardGroupByDate";
import { PaymentsStandardStackParamList } from "./routes";

type Props = BottomTabScreenProps<PaymentsStandardStackParamList, 'Home'>;

export default function Payments({ navigation }: Props) {
  const theme = useTheme();

  const [payments, setPayments] = useState<GroupedStandardByDate[]>([]);

  useEffect(() => {
    // Simula uma chamada à API para buscar os pagamentos
    // Tudo é armazenado no sqlite localmente
    PaymentApi.list_all.execute().then((payments) => {
      setPayments(groupStandardByDate(payments));
    }).catch((error) => {
      console.error("Erro ao buscar pagamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os pagamentos.");
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
    <BaseView>
      <Searchbar
        placeholder="Digite uma descrição ou um valor"
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={5}
        right={(props) => (
          <MdiIcons
            {...props}
            name="calendar-filter"
            size={24}
            onPress={(e) => {
              Alert.alert(
                "Selecione o intervalo de datas:",
                "Nessa funcionalidade será possível escolher um intervalo de datas"
              );
            }}
          />
        )}
      />
      <FlatList
        style={styles.flatlist_style}
        contentContainerStyle={styles.flatlist_contentContainerStyle}
        numColumns={1}
        horizontal={false}
        data={payments}
        // Para evitar problema no Scroll do BaseView
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <StandardGroupedByDate
            title={item.date}
            theme={theme}
            standards={item.standards}
            navigateToEditPage={(payment) => {
              navigation.navigate("Edit", {
                id: payment.id,
                description: payment.description,
                date: new DateString(payment.date),
                currency: payment.currency
              });
            }}
            key={item.date}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhum pagamento encontrado.</Text>}
        keyExtractor={(item) => `${item.date}`}
        // Adiciona espaçamento de tamanho 5 na parte de baixo do FlatList
        ListFooterComponent={<View style={{height: 50}} />}
        ItemSeparatorComponent={() => <FlatListDivider />}
      />
      <Fab
        icon="plus"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  flatlist_style: {
    marginTop: 10
  },
  flatlist_contentContainerStyle: {
    // rowGap: 10,
  },
  renderItem_view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  renderItem_RawText: {
    flex: 1,
    marginLeft: 15,
  },
  renderItem_IconButton: {
    // flex: 1,
  },
  paymentGroupedByDate: {
    rowGap: 7,
    marginTop: 5,
  }
});