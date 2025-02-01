import BaseView from "@/components/BaseView";
import ScreenMenu, { ItemsType } from "@/components/ScreenMenu";
import TitlePage from "@/components/TitlePage";
import { carryingHandleNextPage } from "@/lib/router-functions";
import { useRouter } from "expo-router";

export default function Manage() {
	const router = useRouter();

	const navigateToManageCreditCard = carryingHandleNextPage(
		"/manage/credit-cards",
		router
	);
	const navigateToManagePixKeys = carryingHandleNextPage(
		"/manage/pix-keys",
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
		// {
		// 	key: "pix-keys",
		// 	icon: "qrcode",
		// 	title: "Chaves PIX",
		// 	onPress: navigateToManagePixKeys,
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
			<TitlePage>Gerenciar</TitlePage>
			<ScreenMenu items={items} />
		</BaseView>
	);
}
