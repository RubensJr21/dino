import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BaseView from "@src/application/components/BaseView";
import { VSpace } from "@src/application/components/core";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  Divider,
  Searchbar,
  useTheme
} from "react-native-paper";
import { EditParams } from "./edit";

import { BankAccount } from "@src/core/entities/bank_account.entity";

import BankAccountApi from "@src/application/api/bank-account.api";
import Fab from "@src/application/components/Fab";
import { AccountBankListItem } from "@src/application/screens/Manage/BankAccounts/components/AccountBankListItem";
import { BankAccountsStackParamList } from "./routes";

type Props = NativeStackScreenProps<BankAccountsStackParamList, 'Home'>;

export default function BankAccounts({route, navigation}: Props){
	const theme = useTheme();
  
  const [bank_accounts, setBank_accounts] = useState<BankAccount[]>([]);

	const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simula uma chamada à API para buscar as contas bancárias
    BankAccountApi.list_all.execute().then((accounts) => {
      setBank_accounts(accounts);
    })
  }, []);

	useEffect(() => {
		/* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
		O atributo a ser utilizado é a descrição ou valores.
		posteriormente será feita um filtro
		 */
	}, [searchQuery]);

	const navigateToAccountsBankCreate = () => {
    navigation.navigate("Register")
  };

	const navigateToAccountsBankEdit = (params: EditParams) => {
    navigation.navigate("Edit", params)
  }

	return (
		<BaseView>
			<Searchbar
				placeholder="Digite nome do banco ou número da conta"
				onChangeText={setSearchQuery}
				value={searchQuery}
				elevation={5}
			/>
			<VSpace size={5} />
			<FlatList
				style={{}}
				contentContainerStyle={{}}
				numColumns={1}
				horizontal={false}
				data={bank_accounts}
				// Para evitar problema no Scroll do BaseView
				nestedScrollEnabled={true}
				renderItem={({ item }) => (
					<AccountBankListItem
						theme={theme}
						bank_account={item}
						navigateToEditPage={navigateToAccountsBankEdit}
						navigateToReportsPage={() => {}}
					/>
				)}
				keyExtractor={(item) => `${item.id}`}
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
        onPress={navigateToAccountsBankCreate}
			/>
		</BaseView>
	);
}