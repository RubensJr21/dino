import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BaseView from "@src/application/components/BaseView";
import ScreenMenu, { ItemsType } from "@src/application/components/ScreenMenu";
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
    <BaseView>
      <ScreenMenu items={items} />
    </BaseView>
  );
}