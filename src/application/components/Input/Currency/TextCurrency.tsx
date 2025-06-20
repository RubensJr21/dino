import { Currency } from "@application/classes/Currency";
import { RawText } from "@src/application/components/RawText";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from "react-native-paper";

const BASE_SIZE = 1;
const EM = 22;

interface TextCurrencyProps {
	value: string;
	onPress: () => void;
}

export default function TextCurrency({ value, onPress }: TextCurrencyProps) {
	const theme = useTheme();

	const currency: Currency = new Currency(value);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={[
					styles.root_view,
					{ backgroundColor: theme.colors.elevation.level5 },
				]}
			>
				<RawText style={styles.rt_moneySign}>R$</RawText>
				<RawText style={styles.rt_beforeComma}>{currency.units}</RawText>
				<RawText style={styles.rt_afterComma}>{currency.cents}</RawText>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	root_view: {
		flexDirection: "row",
		alignSelf: "center",
		padding: 7,
		borderRadius: 10,
		width: "100%",
		justifyContent: "center",
	},
	rt_moneySign: {
		textAlignVertical: "center",
		fontSize: (BASE_SIZE + 0.05) * EM,
	},
	rt_beforeComma: {
		textAlignVertical: "center",
		fontSize: (BASE_SIZE + 1.1) * EM,
	},
	rt_afterComma: {
		textAlignVertical: "top",
		fontSize: (BASE_SIZE - 0) * EM,
	},
});
