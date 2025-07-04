import { DateString } from "@src/application/functions/date2String";
import { EditInstallmentScreenParams } from "@src/application/types/screens/InstallmentScreenParams";
import { Installment } from "@src/core/entities/installment.entity";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import DefaultFlatList from "./index";

export interface DefaultFlatListInstallmentProps {
  data: Installment[];
  navigateToEditPage: (params: EditInstallmentScreenParams) => void
}

export default function DefaultFlatListInstallment({ data, navigateToEditPage }: DefaultFlatListInstallmentProps) {
  const theme = useTheme()
  return (
    <DefaultFlatList
      data={data}
      renderItem={({ item }) => (
        <>
          {/* TODO: Preparar interface da Receipt Installment */}
          <Text>{item.id}</Text>
          <Text>{new DateString(item.start_date).toDateString()}</Text>
          <Text>{item.installments_number}</Text>
          <Text>{item.total_amount}</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.outline,
              marginVertical: 5
            }}>
            {item.itens.map((item_value) => (
              <Text>{item_value.id} - {item_value.description} - {item_value.amount}</Text>
            ))}
          </View>
        </>
      )}
      keyExtractor={({ id }) => `${id}`}
    />
  )
}