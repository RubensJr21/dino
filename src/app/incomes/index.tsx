import BaseView from "@/components/BaseView";
import { MdiIcons } from "@/components/ChooseIcon";
import { VSpace } from "@/components/core";
import Custom_FAB from "@/components/CustomFAB";
import { RawText } from "@/components/RawText";
import {
	carryingHandleNextPage,
	FunctionNavigateTo,
} from "@/lib/router-functions";
import { dataGroupByDate, IncomeGroupByDate } from "@/mocks/Incomes";
import { Income } from "@/models/Income";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import {
	Divider,
	IconButton,
	List,
	MD3Theme,
	Searchbar,
	useTheme,
} from "react-native-paper";
import { IncomesEditParams } from "./edit";

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

function filterById(list: Income[], id: number) {
	return list.filter((e) => e.id !== id);
}

// TODO: Depois que Implementar Mock e Model voltar para alterar implementação

export default function Incomes() {
	const router = useRouter();
	const theme = useTheme();

	const [data, setData] = useState<IncomeGroupByDate>(dataGroupByDate);

	const [searchQuery, setSearchQuery] = React.useState("");

	useEffect(() => {
		/* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
		O atributo a ser utilizado é a descrição ou valores.
		posteriormente será feita um filtro
		 */
	}, [searchQuery]);

	const navigateToIncomesCreate = carryingHandleNextPage(
		"/incomes/register",
		router
	);
	const navigateToIncomesReports = carryingHandleNextPage(
		"/incomes/reports",
		router
	);

	const navigateToIncomesEdit = carryingHandleNextPage<IncomesEditParams>(
		"/incomes/edit",
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
						navigateToEditPage={navigateToIncomesEdit}
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
						label: "Registrar entrada",
						onPress: navigateToIncomesCreate,
					},
					{
						icon: "update",
						label: "Registrar entrada recorrente",
						onPress: navigateToIncomesCreate,
					},
					{
						icon: "calendar-plus",
						label: "Registrar entrada à prazo",
						onPress: navigateToIncomesCreate,
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

interface IncomesGroupedByDateProps {
	title: string;
	incomes: Income[];
	theme: MD3Theme;
	navigateToEditPage: FunctionNavigateTo<IncomesEditParams>;
}

function IncomesGroupedByDate({
	title,
	incomes,
	theme,
	navigateToEditPage,
}: IncomesGroupedByDateProps) {
	const [expanded, setExpanded] = useState(true);

	const handlePress = () => {
		setExpanded(!expanded);
	};

	const [data, setData] = useState<Income[]>(incomes);

	return (
		<List.Accordion
			title={title}
			expanded={expanded}
			onPress={handlePress}
			onLongPress={handlePress}
		>
			<View style={styles.incomesGroupedByDate}>
				{data.map((income, index, array) => {
					return (
						// TODO: Trocar implementação para mostrar dados da Income
						<View
							style={[
								styles.renderItem_view,
								{ backgroundColor: theme.colors.background },
							]}
							key={`${income.id}`}
						>
							<RawText style={[styles.renderItem_RawText]}>
								{income.description} - {income.currency}
							</RawText>
							<IconButton
								style={styles.renderItem_IconButton}
								icon="pencil"
								iconColor={theme.colors.inversePrimary}
								size={27}
								onPress={() =>
									navigateToEditPage({
										id: `${income.id}`,
										description: income.description,
										date: income.datePicker,
										currency: income.currency,
										recurring: income.recurring ? "recurring" : "not_recurring",
									})
								}
							/>
							<IconButton
								style={styles.renderItem_IconButton}
								icon="trash-can-outline"
								iconColor={theme.colors.error}
								size={27}
								onPress={callAlert(() =>
									setData((ov) => filterById(ov, income.id))
								)}
							/>
						</View>
					);
				})}
			</View>
		</List.Accordion>
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
