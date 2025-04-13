import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

import BaseView from "@app-components/BaseView";
import { VSpace } from "@app-components/core";
import FlatListCard from "@app-components/FlatListCard";

import { getRandomInt } from "@application/lib/math";

import { TextBold } from "@app-components/TextBold";
import TitlePage from "@app-components/TitlePage";
import { CardData, generateCardsData } from "@application/mocks/CardData";
import { UnknownOutputParams } from "expo-router";

export interface AccountsBankReportsParams extends UnknownOutputParams {
	id: string;
	bank_name: string;
	agency: string;
	account: string;
}

export default function AccountsBankReports({
	id,
	bank_name,
	agency,
	account,
}: AccountsBankReportsParams) {
	const theme = useTheme();
	const getSchemeCharts = useCallback(
		() => (theme.dark ? "light" : "dark"),
		[theme.dark]
	);
	const DATA: CardData[] = generateCardsData(
		getRandomInt(2, 10),
		getSchemeCharts()
	);
	return (
		<BaseView style={{ paddingHorizontal: 0 }}>
			<TitlePage>
				Relatórios da conta no <TextBold>{bank_name}</TextBold>
			</TitlePage>
			<FlatList
				style={styles.flatlist_style}
				contentContainerStyle={styles.flatlist_contentContainerStyle}
				columnWrapperStyle={styles.flatlist_columnWrapperStyle}
				numColumns={2}
				horizontal={false}
				data={DATA}
				// Para evitar problema no Scroll do BaseView
				nestedScrollEnabled={true}
				renderItem={({ item }) => (
					<FlatListCard
						item={item}
						color_from_theme={theme.colors.elevation.level1}
					/>
				)}
				keyExtractor={(item) => item.id}
				// Adiciona espaçamento de tamanho 5 na parte de cima do FlatList
				ListHeaderComponent={<VSpace size={5} />}
				// Adiciona espaçamento de tamanho 5 na parte de baixo do FlatList
				ListFooterComponent={<VSpace size={5} />}
			/>
		</BaseView>
	);
}

const styles = StyleSheet.create({
	flatlist_style: { paddingHorizontal: 5, marginHorizontal: 5 },
	flatlist_contentContainerStyle: { rowGap: 5 },
	flatlist_columnWrapperStyle: { columnGap: 5 },
});
