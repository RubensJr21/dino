import { RawText } from "@app-components/RawText";
import {
  FunctionNavigateTo
} from "@application/lib/router-functions";
import { Income } from "@application/models/Income";
import { confirmRemoveAction } from "@src/application/functions/confirmRemoveAction";
import { UnknownOutputParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  MD3Theme
} from "react-native-paper";

function filterById(list: Income[], id: number) {
	return list.filter((e) => e.id !== id);
}

interface IncomesGroupedByDateProps {
	title: string;
	incomes: Income[];
	theme: MD3Theme;
	navigatesToEditPage: {
    default: FunctionNavigateTo<UnknownOutputParams>;
    installment: FunctionNavigateTo<UnknownOutputParams>;
    recurring: FunctionNavigateTo<UnknownOutputParams>;
};
}

export function IncomesGroupedByDate({
	title,
	incomes,
	theme,
	navigatesToEditPage,
}: IncomesGroupedByDateProps) {
	const [expanded, setExpanded] = useState(true);

	const handlePress = () => {
		setExpanded(!expanded);
	};

	const [data, setData] = useState<Income[]>(incomes);

	return (
		<List.Accordion
			title={title}
			expanded={expanded}
			onPress={handlePress}
			onLongPress={handlePress}
		>
			<View style={styles.incomesGroupedByDate}>
				{data.map((income, index, array) => {
					return (
						// TODO: Trocar implementação para mostrar dados da Income
						<View
							style={[
								styles.renderItem_view,
								{ backgroundColor: theme.colors.background },
							]}
							key={`${income.id}`}
						>
							<RawText style={[styles.renderItem_RawText]}>
								{income.description} - {income.currency} - [{income.type}]
							</RawText>
							<IconButton
								style={styles.renderItem_IconButton}
								icon="pencil"
								iconColor={theme.colors.inversePrimary}
								size={27}
								onPress={() => {
                  if(income.type === "installment"){
                    return navigatesToEditPage.installment({
                      id: `${income.id}`,
                      description: income.description,
                      date: income.datePicker,
                      currency: income.currency,
                      type: income.type,
                    })
                  }
                  if(income.type === "recurring"){
                    return navigatesToEditPage.recurring({
                      id: `${income.id}`,
                      description: income.description,
                      date: income.datePicker,
                      currency: income.currency,
                      type: income.type,
                    })
                  }
                  return navigatesToEditPage.default({
                    id: `${income.id}`,
                    description: income.description,
                    date: income.datePicker,
                    currency: income.currency,
                    type: income.type,
                  })
                }
								}
							/>
							<IconButton
								style={styles.renderItem_IconButton}
								icon="trash-can-outline"
								iconColor={theme.colors.error}
								size={27}
								onPress={confirmRemoveAction(() =>
									setData((ov) => filterById(ov, income.id))
								)}
							/>
						</View>
					);
				})}
			</View>
		</List.Accordion>
	);
}

const styles = StyleSheet.create({
  flatlist_style: {},
  flatlist_contentContainerStyle: {
    // rowGap: 10,
  },
  renderItem_view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  renderItem_RawText: {
    flex: 1,
    marginLeft: 15,
  },
  renderItem_IconButton: {
    // flex: 1,
  },
  incomesGroupedByDate: {
    rowGap: 7,
    marginTop: 5,
  },
});