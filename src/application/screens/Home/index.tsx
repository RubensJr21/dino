import TitlePage from "@app-components/TitlePage";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import BaseView from "@src/application/components/BaseView";
import { RootTabParamList } from "@src/application/root.routes";
import { View } from "react-native";
import { Button } from "react-native-paper";

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>

export default function Home({ route, navigation }: Props) {
  return (
    <BaseView>
      <TitlePage variant="headlineMedium">Home</TitlePage>
      <View>
        <Button onPress={() => navigation.navigate("Incomes")}>Recebimentos</Button>
        <Button onPress={() => navigation.navigate("Expenses")}>Gastos</Button>
      </View>
    </BaseView>
  );
}