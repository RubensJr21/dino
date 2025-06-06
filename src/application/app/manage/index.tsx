import BaseView from "@app-components/BaseView";
import ScreenMenu, { ItemsType } from "@app-components/ScreenMenu";
import TitlePage from "@app-components/TitlePage";
import { carryingHandleNextPage } from "@application/lib/router-functions";
import { useRouter } from "expo-router";

export default function Manage() {
	const router = useRouter();

	const navigateToManageCreditCard = carryingHandleNextPage(
		"/manage/credit-cards",
		router
	);

	const navigateToManageAccountsBank = carryingHandleNextPage(
		"/manage/banks-account",
		router
	);
	const items: ItemsType = [
		{
			key: "credit-cards",
			icon: "credit-card",
			title: "Cartões de Crédito",
			onPress: navigateToManageCreditCard,
		},
		{
			key: "accounts-bank",
			icon: "bank",
			title: "Contas Bancárias",
			onPress: navigateToManageAccountsBank,
		},
	];
	return (
		<BaseView>
			<TitlePage>Gerenciar</TitlePage>
			<ScreenMenu items={items} />
		</BaseView>
	);
}
