import { Searchbar, SearchbarProps } from "react-native-paper";
import { MdiIcons, MdiIconsProps } from "./ChooseIcon";

export interface SearchBarDateProps {
  value: SearchbarProps["value"];
  onChange: SearchbarProps["onChangeText"];
  onPressIcon: MdiIconsProps["onPress"]
}

export default function SearchBarDate({ value, onChange, onPressIcon }: SearchBarDateProps){
  return (
    <Searchbar
        placeholder="Digite uma descrição ou um valor"
        onChangeText={onChange}
        value={value}
        elevation={5}
        right={(props) => (
          <MdiIcons
            {...props}
            name="calendar-filter"
            size={24}
            onPress={onPressIcon}
          />
        )}
      />
  )
}