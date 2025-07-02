import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@src/application/root.routes";
import PaymentsRoutes from "./routes";

type Props = BottomTabScreenProps<RootTabParamList, 'Payments'>

export default function Payments({ }: Props){
  return (
    <PaymentsRoutes/>
  )
}