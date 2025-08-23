import { ComponentProps } from "react";
import { Searchbar, SearchbarProps } from "react-native-paper";
import { MCIcons } from "./Icons.lib";

export interface SearchBarDateProps {
  value: SearchbarProps["value"];
  onChange: SearchbarProps["onChangeText"];
  onPressIcon: ComponentProps<typeof MCIcons>["onPress"]
}

export default function SearchBarDate({ value, onChange, onPressIcon }: SearchBarDateProps) {
  return (
    <Searchbar
      placeholder="Digite uma descrição ou um valor"
      onChangeText={onChange}
      value={value}
      elevation={5}
      right={(props) => (
        <MCIcons
          {...props}
          name="calendar-range"
          size={24}
          onPress={onPressIcon}
        />
      )}
    />
  )
}