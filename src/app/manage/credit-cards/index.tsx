import BaseView from "@/components/BaseView";
import { MdiNamesIcon } from "@/components/ChooseIcon";
import { VSpace } from "@/components/core";
import Custom_FAB from "@/components/CustomFAB";
import {
	carryingHandleNextPage,
	FunctionNavigateTo,
} from "@/lib/router-functions";
import { dataCreditCards } from "@/mocks/CreditCards";
import { CreditCard } from "@/models/CreditCard";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
	Divider,
	ListItemProps as ItemProps,
	List,
	MD3Theme,
	Searchbar,
	useTheme,
} from "react-native-paper";
import { CreditCardsEditParams } from "./edit";
import { CreditCardsReportsParams } from "./reports";

export default function CreditCards() {
	const router = useRouter();
	const theme = useTheme();

	const [data, setData] = useState<CreditCard[]>(dataCreditCards);

	const [searchQuery, setSearchQuery] = React.useState("");

	useEffect(() => {
		/* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
			O atributo a ser utilizado é a descrição ou valores.
			posteriormente será feita um filtro
			 */
	}, [searchQuery]);

	const navigateToCreditCardsCreate = carryingHandleNextPage(
		"/manage/credit-cards/register",
		router
	);
	const navigateToCreditCardsReports =
		carryingHandleNextPage<CreditCardsReportsParams>(
			"/manage/credit-cards/reports",
			router
		);

	const navigateToCreditCardsEdit =
		carryingHandleNextPage<CreditCardsEditParams>(
			"/manage/credit-cards/edit",
			router
		);
	return (
		<BaseView>
			<Searchbar
				placeholder="Digite nome do cartão ou número do cartão"
				onChangeText={setSearchQuery}
				value={searchQuery}
				elevation={5}
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
					<CreditCardListItem
						theme={theme}
						credit_card={item}
						navigateToEditPage={navigateToCreditCardsEdit}
						navigateToReportsPage={navigateToCreditCardsReports}
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
			<Custom_FAB
				actions={[
					{
						icon: "plus",
						label: "Registrar novo cartão",
						onPress: navigateToCreditCardsCreate,
					},
				]}
			/>
		</BaseView>
	);
}

interface CreditCardListItemProps {
	credit_card: CreditCard;
	theme: MD3Theme;
	navigateToEditPage: FunctionNavigateTo<CreditCardsEditParams>;
	navigateToReportsPage: FunctionNavigateTo<CreditCardsReportsParams>;
}

function CreditCardListItem({
	credit_card,
	theme,
	navigateToEditPage,
	navigateToReportsPage,
}: CreditCardListItemProps) {
	const [expanded, setExpanded] = useState(false);

	const handlePress = () => {
		setExpanded(!expanded);
	};

	return (
		<List.Accordion
			title={credit_card.name}
			titleNumberOfLines={3}
			left={(props) => (
				<List.Icon
					{...props}
					icon={"credit-card" as MdiNamesIcon}
				/>
			)}
			expanded={expanded}
			onPress={handlePress}
			onLongPress={handlePress}
		>
			<ListItem
				title="Editar cartão de crédito"
				color={theme.colors.secondary}
				icon="credit-card-edit"
				onPress={() => {
					console.log(
						`Abrindo página de edição do cartão de crédito: ${credit_card.id}`
					);
					navigateToEditPage({
						id: `${credit_card.id}`,
						name: credit_card.name,
						limit: `${credit_card.limit}`,
					});
				}}
			/>
			{/* <ListItem
				title="Remover cartão de crédito"
				icon="credit-card-remove"
				onPress={() =>
					console.log(`Excluindo cartão de crédito: ${credit_card.name}`)
				}
			/> */}
			<ListItem
				title="Desabilitar cartão de crédito"
				color={theme.colors.inverseSurface}
				icon="credit-card-off"
				onPress={() =>
					console.log(`Desabilitando cartão de crédito: ${credit_card.name}`)
				}
			/>
			<ListItem
				title="Abrir relatórios do cartão de crédito"
				color={theme.colors.tertiary}
				// finance ou chart-box
				icon="finance"
				onPress={() => {
					console.log(
						`Abrindo relatórios do cartão de crédito: ${credit_card.name}`
					);
					navigateToReportsPage({
						id: `${credit_card.id}`,
						name: credit_card.name,
						limit: `${credit_card.limit}`,
					});
				}}
			/>
		</List.Accordion>
	);
}

interface ListItemProps extends ItemProps {
	title: string;
	color: string;
	icon: MdiNamesIcon;
}

function ListItem({ title, color, icon, onPress }: ListItemProps) {
	return (
		<List.Item
			title={title}
			left={(props) => (
				<List.Icon
					{...props}
					icon={icon}
					color={color}
				/>
			)}
			titleStyle={{ color }}
			onPress={onPress}
		/>
	);
}

const styles = StyleSheet.create({
	flatlist_style: {},
	flatlist_contentContainerStyle: {
		// rowGap: 10,
	},
});
