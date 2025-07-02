import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { MdiNamesIcon } from "@src/application/components/ChooseIcon";
import { NonEmptyArray } from "@src/types/utility-types";
import ItemMenu from "./ItemMenu";

type ItemType = {
	key: string;
	icon: MdiNamesIcon;
	title: string;
	onPress: () => void;
};

export type ItemsType = NonEmptyArray<ItemType>;

type FinalItemType = ItemType & {
	aspectRatio: number;
};

const addAspectRatio = (
	items: NonNullable<ItemsType>,
	haveTwoPairColumns: boolean
): NonNullable<Array<FinalItemType>> => {
	let index;
	let final_items: NonNullable<Array<FinalItemType>> = [];
	for (index = 0; index < items.length - 1; index++) {
		final_items.push({
			...items[index],
			aspectRatio: 1,
		});
	}
	final_items.push({
		...items[index],
		aspectRatio: haveTwoPairColumns ? 1 : 2,
	});
	return final_items;
};

interface ScreenMenuProps {
	items: NonNullable<ItemsType>;
}

export default function ScreenMenu({ items }: ScreenMenuProps) {
	const haveTwoPairColumns = items.length % 2 === 0;
	const final_itens = addAspectRatio(items, haveTwoPairColumns);

	return (
		<FlatList
			data={final_itens}
			columnWrapperStyle={styles.flatList_column}
			contentContainerStyle={styles.flatList_content}
			numColumns={2}
			renderItem={({ item: { title, aspectRatio, onPress, icon } }) => (
				<ItemMenu
					title={title}
					aspectRatio={aspectRatio}
					onPress={() => onPress()}
					icon={icon}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	flatList_column: {
		columnGap: 10,
	},
	flatList_content: {
		padding: 10,
		rowGap: 10,
	},
});
