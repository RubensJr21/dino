import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@src/application/root.routes";
import ReceiptsRoutes from "./routes";

type Props = BottomTabScreenProps<RootTabParamList, 'Receipts'>

export default function Receipts({ route, navigation }: Props){
  return (
    <ReceiptsRoutes />
  )
}