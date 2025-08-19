import { Keyboard } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { Entypo } from "../Icons.lib";
import { DropdownSearchableContextType } from "./_context";

interface Props<T> {
  context: DropdownSearchableContextType<T>;
}

export function SearchDropdownSearchable<T>({
  context
}: Props<T>) {
  const theme = useTheme()
  const {
    search,
    change_search
  } = context

  return (
    <TextInput
      placeholder="Pesquisar..."
      value={search}
      onChangeText={change_search}
      autoFocus={false}
      mode="flat"
      style={{ margin: 8 }}
      right={<TextInput.Icon
        icon={({ color, size }) => (
          <Entypo
            name="magnifying-glass"
            color={color}
            size={size}
            onPress={() => {
              Keyboard.dismiss()
            }}
          />
        )}
        style={{
          backgroundColor: theme.colors.inversePrimary,
          borderRadius: 5
        }}
      />}
    />
  )
}