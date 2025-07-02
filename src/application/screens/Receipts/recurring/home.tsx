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
import ReceiptRecurringApi from "@src/application/api/receipt/recurring.api";
import Fab from "@src/application/components/Fab";
import { FlatListDivider } from "@src/application/components/FlatList/FlatListDivider";
import { DateString } from "@src/application/functions/date2String";
import { Recurring } from "@src/core/entities/recurring.entity";
import { ReceiptsRecurringStackParamList } from "./routes";

type Props = BottomTabScreenProps<ReceiptsRecurringStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const theme = useTheme();

  const [receipts, setReceipts] = useState<Recurring[]>([]);

  useEffect(() => {
    // Simula uma chamada à API para buscar os recebimentos
    // Tudo é armazenado no sqlite localmente
    ReceiptRecurringApi.list_all.execute().then((receipts_recurring) => {
      setReceipts(receipts_recurring);
    }).catch((error) => {
      console.error("Erro ao buscar recebimentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os recebimentos.");
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
        numColumns={1}
        horizontal={false}
        data={receipts}
        // Para evitar problema no Scroll do BaseView
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <>
            {/* TODO: Preparar interface da Receipt Recurring */}
            <Text>{item.id}</Text>
            <Text>{new DateString(item.start_date).toDateString()}</Text>
            { item.end_date !== undefined && <Text>{new DateString(item.end_date).toDateString()}</Text>}
            <Text>{item.current_amount}</Text>
            <Text>{item.recurrence_type.type}</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.colors.outline,
                marginVertical: 5
              }}>
                {item.itens.map((item_value) => (
                  <Text>{item_value.id} - {item_value.description} - {item_value.amount}</Text>
                ))}
            </View>
          </>
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhum recebimento recorrente encontrado.</Text>}
        keyExtractor={(item) => `${item.id}`}
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
})