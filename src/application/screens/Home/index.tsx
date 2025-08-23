import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import { useLayoutEffect } from "react";
import ListMenu, { ItemsType } from "../Manage/components/ListMenu";

// type Props = BottomTabScreenProps<RootDrawerParamList, 'Home', typeof ID_NAVIGATOR_ROOT>

type Props = StaticScreenProps<{
  username: string;
}>;

export default function Home({ route }: Props) {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      // title: "Home Atualizada!!",
      headTitle: "Home Atualizada!!"
    })
    
    // console.log({navigation})
  }, [navigation])

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