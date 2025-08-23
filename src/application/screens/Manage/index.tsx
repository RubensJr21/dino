import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootDrawerParamList } from "@src/application/root.routes";
import ManageRoutes from "./routes";

type Props = BottomTabScreenProps<RootDrawerParamList, 'Manage'>

export default function Manage({ route, navigation }: Props){
  return (
    <ManageRoutes />
  )
}