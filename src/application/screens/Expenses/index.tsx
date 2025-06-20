import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@src/application/root.routes";
import ExpensesRoutes from "./routes";

type Props = BottomTabScreenProps<RootTabParamList, 'Expenses'>

export default function Expenses({ }: Props){
  return (
    <ExpensesRoutes/>
  )
}