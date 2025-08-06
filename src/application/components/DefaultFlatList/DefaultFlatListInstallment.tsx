import { DateString } from "@src/application/functions/date2String";
import { ValueInstallmentEditScreenTemplate } from "@src/application/templates/screens/Installment/Edit";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import DefaultFlatList from "./index";

export type Data = {
  installment: Installment;
  items: ItemValue[]
}
export interface DefaultFlatListInstallmentProps {
  data: Data[];
  navigateToEditPage: (params: ValueInstallmentEditScreenTemplate) => void
}

export default function DefaultFlatListInstallment({ data, navigateToEditPage }: DefaultFlatListInstallmentProps) {
  const theme = useTheme(); 

  return (
    <DefaultFlatList
      data={data}
      renderItem={({ item }) => (
        <>
          {/* TODO: Preparar interface da Receipt Installment */}
          <Text>{item.installment.id}</Text>
          <Text>{new DateString(item.installment.start_date).toDateString()}</Text>
          <Text>{item.installment.installments_number}</Text>
          <Text>{item.installment.total_amount}</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.outline,
              marginVertical: 5
            }}>
            {/* REVIEW: Adicionar menu de acordeon */}
            {item.items.map((item_value) => (
              <Text>{item_value.id} - {item_value.description} - {item_value.amount}</Text>
            ))}
          </View>
        </>
      )}
      keyExtractor={({ installment }) => `${installment.id}`}
    />
  )
}