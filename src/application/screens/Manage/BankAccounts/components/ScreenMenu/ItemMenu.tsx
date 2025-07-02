import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { MdiIcons, MdiNamesIcon } from "../../../../../components/ChooseIcon";

interface ItemMenuProps {
	icon: MdiNamesIcon;
	title: string;
	onPress: () => void;
	aspectRatio: number;
}

export default function ItemMenu({
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
					<MdiIcons
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
		// padding: 5,
	},
});
