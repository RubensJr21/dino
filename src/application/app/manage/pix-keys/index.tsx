import BaseView from "@app-components/BaseView";
import { VSpace } from "@app-components/core";
import Custom_FAB from "@app-components/CustomFAB";
import {
	carryingHandleNextPage,
	FunctionNavigateTo,
} from "@application/lib/router-functions";
import { dataPixKeys } from "@application/mocks/PixKey";
import { PixKey } from "@application/models/PixKey";
import { UnknownOutputParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
	Divider,
	List,
	MD3Theme,
	Searchbar,
	useTheme,
} from "react-native-paper";
import { PixKeysEditParams } from "./edit";

export interface PixKeysIndexParams extends UnknownOutputParams {
	bank_id: string;
	bank_name: string;
}

export default function PixKeys() {
	const router = useRouter();
	const theme = useTheme();

	const [data, setData] = useState<PixKey[]>(dataPixKeys);

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		/* Quando searchQuery atualizar, será feito um filtro para buscar os elementos que correspondem a query de pesquisa
			O atributo a ser utilizado é a descrição ou valores.
			posteriormente será feita um filtro
			 */
	}, [searchQuery]);

	useEffect(() => {
		// TODO: Buscar as chaves pix do banco selecionado
	}, []);

	const navigateToPixKeysRegister = carryingHandleNextPage(
		"/manage/pix-keys/register",
		router
	);

	const navigateToPixKeysEdit = carryingHandleNextPage<PixKeysEditParams>(
		"/manage/pix-keys/edit",
		router
	);

	// TODO: Só exibir as chaves pix do banco selecionado
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
					<PixKeyListItem
						theme={theme}
						pixkey={item}
						navigateToEditPage={navigateToPixKeysEdit}
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
						label: "Registrar nova chave pix",
						onPress: navigateToPixKeysRegister,
					},
				]}
			/>
		</BaseView>
	);
}

interface PixKeyListItemProps {
	pixkey: PixKey;
	theme: MD3Theme;
	navigateToEditPage: FunctionNavigateTo<PixKeysEditParams>;
}

function PixKeyListItem({
	pixkey,
	theme,
	navigateToEditPage,
}: PixKeyListItemProps) {
	const [expanded, setExpanded] = useState(false);

	const handlePress = () => {
		setExpanded(!expanded);
	};

	return (
		<List.Accordion
			title={pixkey.key}
			titleNumberOfLines={3}
			left={(props) => (
				<List.Icon
					{...props}
					icon={"rhombus-split" as MdiNamesIcon}
				/>
			)}
			expanded={expanded}
			onPress={handlePress}
			onLongPress={handlePress}
		>
			<ListItem
				title="Editar pix"
				color={theme.colors.onPrimaryContainer}
				icon="pencil"
				onPress={() => {
					console.log(`Editando pix ${pixkey.key}`);
					navigateToEditPage({
						pixkey_id: `${pixkey.id}`,
						key: pixkey.key,
						bank_id: `${pixkey.account_bank.id}`,
						bank_name: pixkey.account_bank.bank_name,
						agency: `${pixkey.account_bank.agency}`,
						account: `${pixkey.account_bank.account}`,
					});
				}}
			/>
			<ListItem
				title="Desabilitar pix"
				color={theme.colors.inverseSurface}
				icon="qrcode-remove"
				onPress={() => {
					console.log(
						`Desabilitando pix ${pixkey.key} da conta ${pixkey.account_bank.account} agência ${pixkey.account_bank.agency} no ${pixkey.account_bank.bank_name}`
					);
				}}
			/>
		</List.Accordion>
	);
}

import { MdiNamesIcon } from "@app-components/ChooseIcon";
import { ListItemProps as ItemProps } from "react-native-paper";

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
