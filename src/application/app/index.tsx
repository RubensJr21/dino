import BaseView from "@app-components/BaseView";
import TitlePage from "@app-components/TitlePage";
import { Link } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function Root() {
	return (
		<BaseView>
			<TitlePage variant="headlineMedium">Bem vindo ao Dinô</TitlePage>
			<View>
				<Link
					href="/incomes"
					asChild
				>
					<Button>Recebimentos</Button>
				</Link>
				<Link
					href="/expenses"
					asChild
				>
					<Button>Gastos</Button>
				</Link>
			</View>
		</BaseView>
	);
}
