import { Expense } from "@application/models/Expense";
import { RawText } from "@src/application/components/RawText";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  MD3Theme
} from "react-native-paper";
import { EditInstallmentParams } from "../edit";

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

function filterById(list: Expense[], id: number) {
  return list.filter((e) => e.id !== id);
}

interface ExpenseGroupedByDateProps {
  title: string;
  expenses: Expense[];
  theme: MD3Theme;
  navigateToEditPage: (params: EditInstallmentParams) => void;
}

export default function ExpenseGroupedByDate({
  title,
  expenses,
  theme,
  navigateToEditPage,
}: ExpenseGroupedByDateProps) {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState<Expense[]>(expenses);

  return (
    <List.Accordion
      title={title}
      expanded={expanded}
      onPress={handlePress}
      onLongPress={handlePress}
    >
      <View style={styles.expenseGroupedByDate}>
        {data.map((expense, index, array) => {
          return (
            <View
              style={[
                styles.renderItem_view,
                { backgroundColor: theme.colors.background },
              ]}
              key={`${expense.id}`}
            >
              <RawText style={[styles.renderItem_RawText]}>
                {expense.description} - {expense.currency}
              </RawText>
              <IconButton
                style={styles.renderItem_IconButton}
                icon="pencil"
                iconColor={theme.colors.inversePrimary}
                size={27}
                onPress={() =>
                  navigateToEditPage({
                    id: expense.id,
                    description: expense.description,
                    date: new Date(expense.datePicker),
                    currency: Number(expense.currency),
                    recurring: expense.recurring
                      ? "recurring"
                      : "not_recurring",
                  })
                }
              />
              <IconButton
                style={styles.renderItem_IconButton}
                icon="trash-can-outline"
                iconColor={theme.colors.error}
                size={27}
                onPress={callAlert(() =>
                  setData((ov) => filterById(ov, expense.id))
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
  expenseGroupedByDate: {
    rowGap: 7,
    marginTop: 5,
  },
});