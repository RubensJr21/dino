import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import { ID_NAVIGATOR_ROOT, RootTabParamList } from "@src/application/root.routes";
import { useLayoutEffect } from "react";
import ListMenu, { ItemsType } from "../Manage/components/ListMenu";

type Props = BottomTabScreenProps<RootTabParamList, 'Home', typeof ID_NAVIGATOR_ROOT>

export default function Home({ route, navigation }: Props) {
  const _navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.getParent(ID_NAVIGATOR_ROOT)?.setOptions({
      title: "Home Atualizada!!"
    })
  }, [_navigation])

  const items: ItemsType = [
    {
      key: "receipts",
      icon: "cash-plus",
      title: "Recebimentos",
      onPress: () => navigation.navigate("Receipts"),
    },
    {
      key: "payments",
      icon: "cash-minus",
      title: "Pagamentos",
      onPress: () => navigation.navigate("Payments"),
    },
  ];
  return (
    <BasePageView>
      {/* <BasePageTitle variant="headlineMedium">Home</BasePageTitle> */}
      <ListMenu items={items} />
    </BasePageView>
  );
}