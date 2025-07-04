import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import BasePageTitle from "@src/application/components/BasePage/BasePageTitle";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import { RootTabParamList } from "@src/application/root.routes";
import { View } from "react-native";
import { Button } from "react-native-paper";

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>

export default function Home({ route, navigation }: Props) {
  return (
    <BasePageView>
      <BasePageTitle variant="headlineMedium">Home</BasePageTitle>
      <View>
        <Button onPress={() => navigation.navigate("Receipts")}>Recebimentos</Button>
        <Button onPress={() => navigation.navigate("Payments")}>Gastos</Button>
      </View>
    </BasePageView>
  );
}