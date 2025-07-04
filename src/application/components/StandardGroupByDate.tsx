import { RawText } from "@src/application/components/Text/RawText";
import { Standard } from "@src/core/entities/standard.entity";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  MD3Theme
} from "react-native-paper";
import { EditStandardScreenParams } from "../types/screens/StandardScreenParams";

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

function filterById(list: Standard[], id: number) {
  return list.filter((e) => e.id !== id);
}

export interface StandardGroupedByDateProps {
  title: string;
  standards: Standard[];
  theme: MD3Theme;
  navigateToEditPage: (params: EditStandardScreenParams) => void;
}

export default function StandardGroupedByDate({
  title,
  standards,
  theme,
  navigateToEditPage,
}: StandardGroupedByDateProps) {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState<Standard[]>(standards);

  return (
    <List.Accordion
      title={title}
      expanded={expanded}
      onPress={handlePress}
      onLongPress={handlePress}
    >
      <View style={styles.paymentGroupedByDate}>
        {data.map((standard, index, array) => {
          return (
            <View
              style={[
                styles.renderItem_view,
                { backgroundColor: theme.colors.background },
              ]}
              key={`${standard.id}`}
            >
              <RawText style={[styles.renderItem_RawText]}>
                {standard.item_value.description} - {standard.item_value.amount.toString()}
              </RawText>
              <IconButton
                style={styles.renderItem_IconButton}
                icon="pencil"
                iconColor={theme.colors.inversePrimary}
                size={27}
                onPress={() =>
                  navigateToEditPage({
                    id: standard.id,
                    description: standard.item_value.description,
                    date: standard.item_value.scheduled_at,
                    currency: standard.item_value.amount,
                  })
                }
              />
              <IconButton
                style={styles.renderItem_IconButton}
                icon="trash-can-outline"
                iconColor={theme.colors.error}
                size={27}
                onPress={callAlert(() =>
                  setData((ov) => filterById(ov, standard.id))
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
  paymentGroupedByDate: {
    rowGap: 7,
    marginTop: 5,
  },
});