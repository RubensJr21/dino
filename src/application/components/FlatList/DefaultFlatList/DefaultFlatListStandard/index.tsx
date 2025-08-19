import { GroupedStandardByDate } from "@src/application/functions/groupStandardByDate";
import { useTheme } from "react-native-paper";
import DefaultFlatList from "../index";
import StandardGroupedByDate, { StandardGroupedByDateProps } from "./StandardGroupByDate";

export interface DefaultFlatListStandardProps {
  data: GroupedStandardByDate[];
  navigateToEditPage: StandardGroupedByDateProps["navigateToEditPage"]
}

export default function DefaultFlatListStandard({ data, navigateToEditPage }: DefaultFlatListStandardProps) {
  const theme = useTheme()
  return (
    <DefaultFlatList
      data={data}
      renderItem={({ item }) => (
        <StandardGroupedByDate
          title={item.date}
          theme={theme}
          standards={item.standards}
          navigateToEditPage={navigateToEditPage}
          key={item.date}
        />
      )}
      keyExtractor={({date}) => `${date}`}
    />
  )
}