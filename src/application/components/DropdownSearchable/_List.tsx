import { ReactNode } from "react";
import { ScrollView, TouchableHighlight } from "react-native";
import { List, useTheme } from "react-native-paper";
import { DropdownSearchableContextType, Option } from "./_context";


interface Props<T> {
  context: DropdownSearchableContextType<T>;
  renderItem: (label: Option<T>["label"]) => ReactNode;
}

export function ListDropdownSearchable<T>({
  context,
  renderItem
}: Props<T>) {
  const { options, change_selected, dismiss_modal } = context

  const theme = useTheme()

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal: 8,
        rowGap: 7
      }}
    >
      {
        options.length === 0 ?
          <List.Item title="Nenhum item encontrado" />
          :
          options.map((option, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => {
                change_selected(option);
                dismiss_modal()
              }}
              style={{
                backgroundColor: theme.colors.inversePrimary,
                borderRadius: theme.roundness,
                paddingHorizontal: 8,
                paddingVertical: 16
              }}
            >
              {renderItem(option.label)}
            </TouchableHighlight>
          )
          )
      }
    </ScrollView>
  )
}