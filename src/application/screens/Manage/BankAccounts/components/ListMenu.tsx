import { IconNames, MCIcons } from "@src/application/components/Icons.lib";
import { NonEmptyArray } from "@src/types/utility-types";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type ItemType = {
	key: string;
	icon: IconNames<typeof MCIcons>;
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

interface ListMenuProps {
	items: NonNullable<ItemsType>;
}

export default function ListMenu({ items }: ListMenuProps) {
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

interface ItemMenuProps {
  icon: IconNames<typeof MCIcons>;
  title: string;
  onPress: () => void;
  aspectRatio: number;
}

function ItemMenu({
  icon,
  title,
  aspectRatio,
  onPress,
}: ItemMenuProps) {
  return (
    <View style={[styles.ItemMenu, { aspectRatio: aspectRatio }]}>
      <TouchableNativeFeedback
        onPress={() => onPress()}
        background={TouchableNativeFeedback.Ripple("gray", true)}
      >
        <View style={styles.ItemMenuViwTitle}>
          <MCIcons
            name={icon}
            size={75}
          />
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
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
  ItemMenu: {
		flex: 1,
		aspectRatio: 1,
		borderStyle: "solid",
		borderWidth: 2.5,
		borderColor: "gray",
		borderRadius: 25,
		overflow: "hidden",
		backgroundColor: "white",
		get padding() {
			return this.borderRadius / 4.5;
		},
	},
	ItemMenuViwTitle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
