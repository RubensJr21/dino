import BaseView from "@/components/BaseView";
import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Root() {
	return (
		<BaseView>
			<Text variant="headlineMedium">Bem vindo ao Dino</Text>
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
