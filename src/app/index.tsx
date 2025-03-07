import Api from "@/api";
import BaseView from "@/components/BaseView";
import TitlePage from "@/components/TitlePage";
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
						const values = {
							description: "Minha descrição de recebimento",
							scheduled_at: new Date(),
							amount: 45.5,
							transfer_method_type: "Pix",
							tag: "Educação",
						};
						const r = await Api.cadastrarRecebimento(values);
						console.log(r);
					}}
				>
					Registrar Recebimento
				</Button>

				<Button
					onPress={async () => {
						const receipts = await Api.listarRecebimentos();
						console.log(receipts);
					}}
				>
					Listar Recebimentos
				</Button>
				<Button
					onPress={async () => {
						const id_search = 1;
						const receipt = await Api.listarRecebimentoEspecifico(id_search);
						console.log(receipt);
					}}
				>
					Obter Recebimento (1)
				</Button>
				<Button
					onPress={async () => {
						const id_search = 1;

						const receipt = await Api.listarRecebimentoEspecifico(id_search);

						if (receipt) {
							receipt.amount = 100;
							const receipt_updated = await Api.atualizarRecebimento(receipt);
							console.log(receipt_updated);
						} else {
							console.log("Recebimento não encontrado");
						}
					}}
				>
					Atualizar Recebimento (1)
				</Button>
				<Button
					onPress={async () => {
						const id_search = 1;

						const receipt = await Api.informarRecebimentoExecutado(id_search);

						if (receipt) {
							console.log(receipt);
						} else {
							console.log("Recebimento não encontrado");
						}
					}}
				>
					Informar que Recebimento foi executado (1)
				</Button>

				<Button
					onPress={async () => {
						const id_search = 1;

						if (await Api.deletarRecebimento(id_search)) {
							console.log("Recebimento deletado com sucesso");
						} else {
							console.log("Recebimento não encontrado");
						}
					}}
				>
					Deletar Recebimento (1)
				</Button>
			</View>
		</BaseView>
	);
}
