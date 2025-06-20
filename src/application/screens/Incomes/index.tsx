import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@src/application/root.routes";
import IncomesRoutes from "./routes";

type Props = BottomTabScreenProps<RootTabParamList, 'Incomes'>

export default function Incomes({ route, navigation }: Props){
  return (
    <IncomesRoutes />
  )
}