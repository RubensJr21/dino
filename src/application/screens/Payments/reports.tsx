import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

import BasePageView from "@src/application/components/BasePage/BasePageView";
import FlatListCard from "@src/application/components/FlatList/FlatListCard";

import { getRandomInt } from "@src/application/utils/math";

import { CardData, generateCardsData } from "@src/application/_mocks/CardData";

export default function PaymentsReports() {
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
		<BasePageView style={{ paddingHorizontal: 0 }}>
			<FlatList
				style={styles.flatlist_style}
				contentContainerStyle={styles.flatlist_contentContainerStyle}
				columnWrapperStyle={styles.flatlist_columnWrapperStyle}
				numColumns={2}
				horizontal={false}
				data={DATA}
				// Para evitar problema no Scroll do BasePageView
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
		</BasePageView>
	);
}

const styles = StyleSheet.create({
	flatlist_style: { paddingHorizontal: 5, marginHorizontal: 5 },
	flatlist_contentContainerStyle: { rowGap: 5 },
	flatlist_columnWrapperStyle: { columnGap: 5 },
});
