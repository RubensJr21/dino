import BaseView from "@app-components/BaseView";
import TitlePage from "@app-components/TitlePage";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/drizzle/item_value.repository";
import TagDrizzleRepository from "@src/infrastructure/repositories/drizzle/tag.repository";
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
				<Button
					onPress={async () => {
						const repo_base_item_value = new ItemValueDrizzleRepository()
						console.log(await repo_base_item_value.findAll())
					}}>
					Obter Base Item Values
				</Button>
				<Button
					onPress={async () => {
						const repo_tag = new TagDrizzleRepository()
						console.log(await repo_tag.findAll())
					}}>
					Obter Tags
				</Button>
			</View>
		</BaseView>
	);
}
