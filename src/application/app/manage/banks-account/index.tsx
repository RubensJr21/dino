import BaseView from "@app-components/BaseView";
import { MdiNamesIcon } from "@app-components/ChooseIcon";
import { VSpace } from "@app-components/core";
import Custom_FAB from "@app-components/CustomFAB";
import {
	carryingHandleNextPage,
	FunctionNavigateTo,
} from "@application/lib/router-functions";
import { dataAccountsBank } from "@application/mocks/AccountsBank";
import { AccountsBank } from "@application/models/AccountsBank";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import {
	Divider,
	List,
	MD3Theme,
	Searchbar,
	useTheme,
} from "react-native-paper";
import { AccountsBankEditParams } from "./edit";
import { AccountsBankReportsParams } from "./reports";

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

export default function BanksAccount() {
	const router = useRouter();
	const theme = useTheme();

	const [data, setData] = useState<AccountsBank[]>(dataAccountsBank);

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		/* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
		O atributo a ser utilizado é a descrição ou valores.
		posteriormente será feita um filtro
		 */
	}, [searchQuery]);

	const navigateToAccountsBankCreate = carryingHandleNextPage(
		"/manage/banks-account/register",
		router
	);
	const navigateToAccountsBankReports =
		carryingHandleNextPage<AccountsBankReportsParams>(
			"/manage/banks-account/reports",
			router
		);

	const navigateToAccountsBankEdit =
		carryingHandleNextPage<AccountsBankEditParams>(
			"/manage/banks-account/edit",
			router
		);

	const navigateToManagePixKeysFromAccountsBank =
		carryingHandleNextPage<PixKeysIndexParams>("/manage/pix-keys", router);

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
				style={styles.flatlist_style}
				contentContainerStyle={styles.flatlist_contentContainerStyle}
				numColumns={1}
				horizontal={false}
				data={data}
				// Para evitar problema no Scroll do BaseView
				nestedScrollEnabled={true}
				renderItem={({ item }) => (
					<AccountBankListItem
						theme={theme}
						account_bank={item}
						navigateToEditPage={navigateToAccountsBankEdit}
						navigateToManagePixKeys={navigateToManagePixKeysFromAccountsBank}
						navigateToReportsPage={navigateToAccountsBankReports}
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
						label: "Registrar nova conta",
						onPress: navigateToAccountsBankCreate,
					},
				]}
			/>
		</BaseView>
	);
}

interface AccountBankListItemProps {
	account_bank: AccountsBank;
	theme: MD3Theme;
	navigateToEditPage: FunctionNavigateTo<AccountsBankEditParams>;
	navigateToManagePixKeys: FunctionNavigateTo<PixKeysIndexParams>;
	navigateToReportsPage: FunctionNavigateTo<AccountsBankReportsParams>;
}

function AccountBankListItem({
	account_bank,
	theme,
	navigateToEditPage,
	navigateToReportsPage,
	navigateToManagePixKeys,
}: AccountBankListItemProps) {
	const [expanded, setExpanded] = useState(false);

	const handlePress = () => {
		setExpanded(!expanded);
	};

	const title = `${
		account_bank.bank_name
	} - agência: ${account_bank.agency.toString()} conta: ${account_bank.account.toString()}`;

	return (
		<List.Accordion
			title={title}
			titleNumberOfLines={3}
			left={(props) => (
				<List.Icon
					{...props}
					icon={"bank-outline" as MdiNamesIcon}
				/>
			)}
			expanded={expanded}
			onPress={handlePress}
			onLongPress={handlePress}
		>
			<ListItem
				title="Gerenciar chaves Pix da conta bancária"
				color={theme.colors.secondary}
				icon="rhombus-split"
				onPress={() => {
					console.log(
						`Abrindo página de gerenciamento de Pix ${account_bank.id}`
					);
					navigateToManagePixKeys({
						bank_id: `${account_bank.id}`,
						bank_name: account_bank.bank_name,
						agency: `${account_bank.agency}`,
						account: `${account_bank.account}`,
					});
				}}
			/>
			<ListItem
				title="Editar conta bancária"
				color={theme.colors.onPrimaryContainer}
				icon="pencil"
				onPress={() => {
					console.log(`Editando conta bancária ${account_bank.id}`);
					navigateToEditPage({
						id: `${account_bank.id}`,
						bank_name: account_bank.bank_name,
						agency: `${account_bank.agency}`,
						account: `${account_bank.account}`,
					});
				}}
			/>
			{/* <ListItem
				title="Remover conta bancária"
				color={theme.colors.error}
				// credit-card-remove, credit-card-remove-outline
				// account-remove, account-remove-outline
				// bank-remove
				// trash-can, trash-can-outline
				// delete, delete-outline
				icon="bank-remove"
				onPress={() =>
					console.log(`Excluindo conta bancária ${account_bank.id}`)
				}
			/> */}
			<ListItem
				title="Desabilitar conta bancária"
				color={theme.colors.inverseSurface}
				// credit-card-off, credit-card-off-outline
				// account-off, account-off-outline
				// bank-off, bank-off-outline
				icon="bank-off-outline"
				onPress={() =>
					console.log(`Desabilitando conta bancária ${account_bank.id}`)
				}
			/>
			<ListItem
				title="Abrir relatórios da conta bancária"
				color={theme.colors.tertiary}
				// finance ou chart-box
				icon="finance"
				onPress={() => {
					console.log(
						`Abrindo relatórios da conta bancária ${account_bank.id}`
					);
					navigateToReportsPage({
						id: `${account_bank.id}`,
						bank_name: account_bank.bank_name,
						agency: `${account_bank.agency}`,
						account: `${account_bank.account}`,
					});
				}}
			/>
		</List.Accordion>
	);
}

import { ListItemProps as ItemProps } from "react-native-paper";
import { PixKeysIndexParams } from "../pix-keys";

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
