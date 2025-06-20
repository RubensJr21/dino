import { Income } from "@application/models/Income";
import { RawText } from "@src/application/components/RawText";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  MD3Theme
} from "react-native-paper";
import { EditRecurringParams } from "../edit";

function callAlert(fnSetData: () => void) {
  return () => {
    // title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions
    Alert.alert("Atenção!", `Deseja mesmo remover este item?`, [
      {
        text: "Sim",
        onPress: fnSetData,
        style: "destructive",
      },
      {
        text: "Não",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };
}

function filterById(list: Income[], id: number) {
  return list.filter((e) => e.id !== id);
}

interface IncomeGroupedByDateProps {
  title: string;
  incomes: Income[];
  theme: MD3Theme;
  navigateToEditPage: (params: EditRecurringParams) => void;
}

export default function IncomeGroupedByDate({
  title,
  incomes,
  theme,
  navigateToEditPage,
}: IncomeGroupedByDateProps) {
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
      <View style={styles.incomeGroupedByDate}>
        {data.map((income, index, array) => {
          return (
            <View
              style={[
                styles.renderItem_view,
                { backgroundColor: theme.colors.background },
              ]}
              key={`${income.id}`}
            >
              <RawText style={[styles.renderItem_RawText]}>
                {income.description} - {income.currency}
              </RawText>
              <IconButton
                style={styles.renderItem_IconButton}
                icon="pencil"
                iconColor={theme.colors.inversePrimary}
                size={27}
                onPress={() =>
                  // navigateToEditPage({
                  //   id: income.id,
                  //   description: income.description,
                  //   date: new Date(income.datePicker),
                  //   currency: Number(income.currency),
                  //   recurring: income.recurring
                  //     ? "recurring"
                  //     : "not_recurring",
                  // })
                  null
                }
              />
              <IconButton
                style={styles.renderItem_IconButton}
                icon="trash-can-outline"
                iconColor={theme.colors.error}
                size={27}
                onPress={callAlert(() =>
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
  incomeGroupedByDate: {
    rowGap: 7,
    marginTop: 5,
  },
});