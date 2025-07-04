import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BasePageView from "@src/application/components/BasePage/BasePageView";
import ListMenu, { ItemsType } from "@src/application/screens/Manage/BankAccounts/components/ListMenu";
import { ManageStackParamList } from "./routes";

type Props = NativeStackScreenProps<ManageStackParamList, 'Home'>;

export default function Home({ route, navigation }: Props) {
  // const navigateToManageCreditCard = () => {
  //   navigation.navigate("BankAccounts")
  // };

  const navigateToManageAccountsBank = () => {
    navigation.navigate("BankAccounts")
  };
  
  const items: ItemsType = [
    // {
    //   key: "credit-cards",
    //   icon: "credit-card",
    //   title: "Cartões de Crédito",
    //   onPress: navigateToManageCreditCard,
    // },
    {
      key: "accounts-bank",
      icon: "bank",
      title: "Contas Bancárias",
      onPress: navigateToManageAccountsBank,
    },
  ];
  return (
    <BasePageView>
      <ListMenu items={items} />
    </BasePageView>
  );
}