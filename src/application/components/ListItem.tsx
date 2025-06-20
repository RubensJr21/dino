import { ListItemProps as ItemProps, List } from "react-native-paper";
import { MdiNamesIcon } from "./ChooseIcon";
interface ListItemProps extends ItemProps {
  title: string;
  color: string;
  icon: MdiNamesIcon;
}

export function ListItem({ title, color, icon, onPress }: ListItemProps) {
  return (
    <List.Item
      title={title}
      left={(props) => (
        <List.Icon
          {...props}
          icon={icon}
          color={color}
        />
      )}
      titleStyle={{ color }}
      onPress={onPress}
    />
  );
}