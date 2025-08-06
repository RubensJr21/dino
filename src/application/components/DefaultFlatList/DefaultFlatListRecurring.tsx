import { DateString } from "@src/application/functions/date2String";
import { ValueRecurringEditScreenTemplate } from "@src/application/templates/screens/Recurring/Edit";
import { DetailsRecurringScreenParams } from "@src/application/types/screens/RecurringScreenParams";
import { Recurring } from "@src/core/entities/recurring.entity";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import DefaultFlatList from "./index";

export interface DefaultFlatListRecurringProps {
  data: Recurring[];
  navigateToEditPage: (params: ValueRecurringEditScreenTemplate) => void
  navigateToDetailsPage: (params: DetailsRecurringScreenParams) => void;
}

export default function DefaultFlatListRecurring({ data, navigateToEditPage, navigateToDetailsPage }: DefaultFlatListRecurringProps) {
  const theme = useTheme()
  return (
    <DefaultFlatList
      data={data}
      renderItem={({ item }) => (
        <>
          {/* TODO: Preparar interface da Receipt Recurring */}
          <Text>{item.id}</Text>
          <Text>{new DateString(item.start_date).toDateString()}</Text>
          {item.end_date !== undefined && <Text>{new DateString(item.end_date).toDateString()}</Text>}
          <Text>{item.current_amount}</Text>
          <Text>{item.recurrence_type.type}</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.outline,
              marginVertical: 5
            }}>
              <Button
                mode="contained"
                onPress={() => navigateToDetailsPage({ recurring_id: item.id })}
                style={{ marginVertical: 5, marginHorizontal: 10 }}
              >
                Navegar para Detalhes
              </Button>
            {/* ATTENTION: Navegar para a tela Details do Recurring atual */}
          </View>
        </>
      )}
      keyExtractor={({ id }) => `${id}`}
    />
  )
}