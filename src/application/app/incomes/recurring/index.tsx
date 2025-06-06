import BaseView from "@app-components/BaseView";
import { MdiIcons } from "@app-components/ChooseIcon";
import { VSpace } from "@app-components/core";
import Custom_FAB from "@app-components/CustomFAB";
import {
  carryingHandleNextPage
} from "@application/lib/router-functions";
import { dataGroupByDate, IncomeGroupByDate } from "@application/mocks/Incomes";
import { IncomesGroupedByDate } from "@src/application/components/incomes/IncomesGroupedByDate";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import {
  Divider,
  Searchbar,
  useTheme
} from "react-native-paper";

// TODO: Depois que Implementar Mock e Model voltar para alterar implementação

export default function Incomes() {
	const router = useRouter();
	const theme = useTheme();

  // REVIEW: Provavelmente vou precisar renderizar os recebimentos de acordo com o tipo de recebimento
  // Exemplo: Recebimentos à prazo, recorrentes, etc.
  // Idea: Criar um tab superior para separar os tipos de recebimentos
  // Possíveis componente:
  // * https://callstack.github.io/react-native-paper/tabs.html
  // * 
  // Possíveis implementações: https://callstack.github.io/react-native-paper/tabs.html#using-tabs-with-a-flatlist
	const [data, setData] = useState<IncomeGroupByDate>(dataGroupByDate);

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		/* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
		O atributo a ser utilizado é a descrição ou valores.
		posteriormente será feita um filtro
		 */
	}, [searchQuery]);

  const navigatesToRegister = {
    default: carryingHandleNextPage(
      "/incomes/register",
      router
    ),
    installment: carryingHandleNextPage(
      "/incomes/installment/register",
      router
    ),
    recurring: carryingHandleNextPage(
      "/incomes/recurring/register",
      router
    )
  }

  const navigatesToEdit = {
    default: carryingHandleNextPage(
      "/incomes/edit",
      router
    ),
    installment: carryingHandleNextPage(
      "/incomes/installment/edit",
      router
    ),
    recurring: carryingHandleNextPage(
      "/incomes/recurring/edit",
      router
    )
  }

	const navigateToIncomesReports = carryingHandleNextPage(
		"/incomes/reports",
		router
	);

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
				data={data}
				// Para evitar problema no Scroll do BaseView
				nestedScrollEnabled={true}
				renderItem={({ item }) => (
					<IncomesGroupedByDate
						title={item.date}
						theme={theme}
						incomes={item.expenses}
						navigatesToEditPage={navigatesToEdit}
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
			<Custom_FAB
				actions={[
					{
						icon: "plus",
						label: "Registrar recebimento",
						onPress: navigatesToRegister.default,
					},
					{
						icon: "update",
						label: "Registrar recebimento recorrente",
						onPress: navigatesToRegister.recurring,
					},
					{
						icon: "calendar-plus",
						label: "Registrar recebimento à prazo",
						onPress: navigatesToRegister.installment,
					},
					{
						icon: "finance",
						label: "Relatórios",
						onPress: navigateToIncomesReports,
					},
				]}
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
	incomesGroupedByDate: {
		rowGap: 7,
		marginTop: 5,
	},
});
