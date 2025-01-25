import { getBackgroundColor } from "@/lib/colors";
import { CardData } from "@/mocks/CardData";
import { Card } from "react-native-paper";
import ValueDisplayChart from "./ValueDisplayChart";

export default function FlatListCard({
	item,
	color_from_theme,
}: {
	item: CardData;
	color_from_theme: string;
}) {
	const colorType = item.info.type == "Saída" ? "#FF0000" : "#00FF00";
	const backgroundColor = getBackgroundColor(colorType, color_from_theme);
	return (
		<Card style={{ flex: 1, backgroundColor }}>
			<Card.Title
				title={item.info.description}
				subtitle={item.info.type}
				subtitleStyle={{ color: colorType }}
			/>
			<Card.Content>
				<ValueDisplayChart
					executedColor={item.executedColor}
					executedValue={item.executedValue}
					plannedColor={item.plannedColor}
					plannedValue={item.plannedValue}
				/>
			</Card.Content>
		</Card>
	);
}
