import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Searchbar,
  Text,
  useTheme
} from "react-native-paper";
import { EditParams } from "./edit";

import { BankAccount } from "@src/core/entities/bank_account.entity";

import BankAccountApi from "@src/application/api/bank-account.api";
import Fab from "@src/application/components/ActionsFab/Fab";
import { FlatListDivider } from "@src/application/components/FlatList/FlatListDivider";
import { AccountBankListItem } from "@src/application/screens/Manage/BankAccounts/components/AccountBankListItem";
import { BankAccountsStackParamList } from "./routes";

export interface HomeParams {
  last_bank_account_modified?: string;
}

type Props = NativeStackScreenProps<BankAccountsStackParamList, 'Home'>;

export default function BankAccounts({ route, navigation }: Props) {
  const theme = useTheme();

  useEffect(() => {
    if (route.params?.last_bank_account_modified) {
      // Se a rota foi chamada com o parâmetro last_bank_account_modified, atualiza a lista de contas bancárias
      BankAccountApi.list_all().then((accounts) => {
        if (accounts) {
          setBank_accounts(accounts);
        }
      });
    }
  }, [route.params?.last_bank_account_modified]);

  const [bank_accounts, setBank_accounts] = useState<BankAccount[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    BankAccountApi.list_all().then((accounts) => {
      if (accounts) {
        setBank_accounts(accounts);
      }
    })
  }, []);

  useEffect(() => {
    /* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
    O atributo a ser utilizado é a descrição ou valores.
    posteriormente será feita um filtro
     */
  }, [searchQuery]);

  const navigateToAccountsBankCreate = () => {
    navigation.navigate("Register");
  };

  const navigateToAccountsBankEdit = (params: EditParams) => {
    navigation.navigate("Edit", params);
  }

  return (
    <BasePageView>
      <Searchbar
        placeholder="Digite nome do banco ou número da conta"
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={5}
      />
      <FlatList
        style={styles.flatlist_style}
        contentContainerStyle={{}}
        numColumns={1}
        horizontal={false}
        data={bank_accounts}
        // Para evitar problema no Scroll do BasePageView
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <AccountBankListItem
            theme={theme}
            bank_account={item}
            navigateToEditPage={navigateToAccountsBankEdit}
            navigateToReportsPage={() => { }}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Nenhuma conta bancária encontrada.</Text>}
        keyExtractor={(item) => `${item.id}`}
        ListFooterComponent={<View style={{ height: 50 }} />}
        ItemSeparatorComponent={() => <FlatListDivider />}
      />
      <Fab
        icon="plus"
        onPress={navigateToAccountsBankCreate}
      />
    </BasePageView>
  );
}

const styles = StyleSheet.create({
  flatlist_style: {
    marginTop: 10,
    paddingBottom: 50
  }
});