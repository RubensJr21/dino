import { Standard as Payment } from "@core/entities/standard.entity";
import { RawText } from "@src/application/components/RawText";
import { DateString } from "@src/application/functions/date2String";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  MD3Theme
} from "react-native-paper";
import { EditStandardParams } from "../edit";

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

function filterById(list: Payment[], id: number) {
  return list.filter((e) => e.id !== id);
}

interface PaymentGroupedByDateProps {
  title: string;
  payments: Payment[];
  theme: MD3Theme;
  navigateToEditPage: (params: EditStandardParams) => void;
}

export default function PaymentGroupedByDate({
  title,
  payments,
  theme,
  navigateToEditPage,
}: PaymentGroupedByDateProps) {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState<Payment[]>(payments);

  return (
    <List.Accordion
      title={title}
      expanded={expanded}
      onPress={handlePress}
      onLongPress={handlePress}
    >
      <View style={styles.paymentGroupedByDate}>
        {data.map((payment, index, array) => {
          return (
            <View
              style={[
                styles.renderItem_view,
                { backgroundColor: theme.colors.background },
              ]}
              key={`${payment.id}`}
            >
              <RawText style={[styles.renderItem_RawText]}>
                {payment.item_value.description} - {payment.item_value.amount}
              </RawText>
              <IconButton
                style={styles.renderItem_IconButton}
                icon="pencil"
                iconColor={theme.colors.inversePrimary}
                size={27}
                onPress={() =>
                  navigateToEditPage({
                    id: payment.id,
                    description: payment.item_value.description,
                    date: new DateString(payment.item_value.scheduled_at),
                    currency: Number(payment.item_value.amount)
                  })
                }
              />
              <IconButton
                style={styles.renderItem_IconButton}
                icon="trash-can-outline"
                iconColor={theme.colors.error}
                size={27}
                onPress={callAlert(() =>
                  setData((ov) => filterById(ov, payment.id))
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