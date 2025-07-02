import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

import BaseView from "@src/application/components/BaseView";
import FlatListCard from "@src/application/components/FlatList/FlatListCard";

import { getRandomInt } from "@src/application/utils/math";

import TitlePage from "@app-components/TitlePage";
import { CardData, generateCardsData } from "@src/application/_mocks/CardData";
import { TextBold } from "@src/application/components/TextBold";
import { UnknownOutputParams } from "expo-router";

export interface AccountsBankReportsParams extends UnknownOutputParams {
	id: string;
	nickname: string;
}

export default function AccountsBankReports({
	id,
	nickname
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
				Relatórios da conta no <TextBold>{nickname}</TextBold>
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
				ListHeaderComponent={<View style={{height: 5}} />}
				// Adiciona espaçamento de tamanho 5 na parte de baixo do FlatList
				ListFooterComponent={<View style={{height: 5}} />}
			/>
		</BaseView>
	);
}

const styles = StyleSheet.create({
	flatlist_style: { paddingHorizontal: 5, marginHorizontal: 5 },
	flatlist_contentContainerStyle: { rowGap: 5 },
	flatlist_columnWrapperStyle: { columnGap: 5 },
});
