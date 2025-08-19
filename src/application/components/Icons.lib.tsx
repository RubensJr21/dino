import { ComponentProps, ComponentType } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";
import MCIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";

export type IconNames<T extends ComponentType<any>> = ComponentProps<T>['name'];

export { AntDesign, Entypo, Foundation, MCIcons, Octicons };

