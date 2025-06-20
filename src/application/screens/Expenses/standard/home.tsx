import { Expense } from "@application/models/Expense";
import { dataGroupByDate } from "@src/application/_mocks/Expenses";
import BaseView from "@src/application/components/BaseView";
import { MdiIcons } from "@src/application/components/ChooseIcon";
import { VSpace } from "@src/application/components/core";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import {
  Divider,
  Searchbar,
  useTheme
} from "react-native-paper";

function callAlert(fnSetData: () => void) {
  return () => {
    // title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions
    Alert.alert("Atenção!", `Deseja mesmo remover este item?`, [
      {
        text: "Sim",
        onPress: fnSetData,
        style: "destructive",
      },
      {
        text: "Não",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };
}

function filterById(list: Expense[], id: number) {
  return list.filter((e) => e.id !== id);
}

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Fab from "@src/application/components/Fab";
import ExpenseGroupedByDate from "./components/ExpensesGroupByDate";
import { ExpensesStandardStackParamList } from "./routes";

type ExpensesProps = BottomTabScreenProps<ExpensesStandardStackParamList, 'Home'>;

export default function Expenses({ navigation }: ExpensesProps) {
  // const navigation = useNavigation();
  const theme = useTheme();

  // const [data, setData] = useState<ExpenseGroupByDate>(dataGroupByDate);

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
      <VSpace size={5} />
      <FlatList
        style={styles.flatlist_style}
        contentContainerStyle={styles.flatlist_contentContainerStyle}
        numColumns={1}
        horizontal={false}
        data={dataGroupByDate}
        // Para evitar problema no Scroll do BaseView
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <ExpenseGroupedByDate
            title={item.date}
            theme={theme}
            expenses={item.expenses}
            navigateToEditPage={(expense) => {
              navigation.navigate("Edit", {
                id: expense.id,
                description: expense.description,
                date: expense.date,
                currency: expense.currency,
                recurring: expense.recurring
              });
            }}
            key={item.date}
          />
        )}
        keyExtractor={(item) => `${item.date}`}
        // Adiciona espaçamento de tamanho 5 na parte de cima do FlatList
        // ListHeaderComponent={<VSpace size={5} />}
        // Adiciona espaçamento de tamanho 5 na parte de baixo do FlatList
        ListFooterComponent={<VSpace size={50} />}
        ItemSeparatorComponent={() => {
          const size = 7;
          return (
            <>
              <VSpace size={size} />
              <Divider />
              <VSpace size={size} />
            </>
          );
        }}
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
  flatlist_style: {},
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
  expenseGroupedByDate: {
    rowGap: 7,
    marginTop: 5,
  }
});