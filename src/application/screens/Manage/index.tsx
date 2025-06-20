import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@src/application/root.routes";
import ManageRoutes from "./routes";

type Props = BottomTabScreenProps<RootTabParamList, 'Manage'>

export default function Manage({ route, navigation }: Props){
  return (
    <ManageRoutes />
  )
}