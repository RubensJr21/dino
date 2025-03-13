import Api from "@/api";
import { RepositoryReceipt_BaseRegisterParam } from "@/api/core/receipt/ports/IRepositoryReceipt_Base";
import { RepositoryReceipt_RecurringRegisterParam } from "@/api/core/receipt/ports/IRepositoryReceipt_Recurring";
import BaseView from "@/components/BaseView";
import TitlePage from "@/components/TitlePage";
import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface v_Register {
	receipt: RepositoryReceipt_BaseRegisterParam;
	receipt_recurring: RepositoryReceipt_RecurringRegisterParam;
}

const values_Register: v_Register = {
	receipt: {
		description: "Minha descrição de recebimento",
		scheduled_at: new Date(),
		amount: 45.5,
		transfer_method_type: "Pix",
		tag: "Educação",
	},
	receipt_recurring: {
		description: "Minha descrição de recebimento",
		scheduled_at: new Date(),
		amount: 45.5,
		transfer_method_type: "Pix",
		tag: "Educação",
		recurrence_type: "Mensalmente",
	},
};

const id_search_receipt = 1;

const handle_Register_Receipt = async () => {
	console.log(await Api.Recebimentos.cadastrar(values_Register.receipt));
};
const handle_FindAll_Receipts = async () => {
	console.log(await Api.Recebimentos.listar_todos());
};
const handle_FindReceipt1ById = async () => {
	console.log(await Api.Recebimentos.listar_especifico(id_search_receipt));
};
const handle_UpdateReceipt1AmountTo100 = async () => {
	const receipt = await Api.Recebimentos.listar_especifico(id_search_receipt);
	if (receipt) {
		receipt.amount = 100;
		console.log(await Api.Recebimentos.atualizar(receipt));
	} else {
		console.log("Recebimento não encontrado");
	}
};
const handle_MarkReceipt1AsProcessed = async () => {
	const receipt = await Api.Recebimentos.marcar_recebido(id_search_receipt);
	if (receipt) {
		console.log(receipt);
	} else {
		console.log("Recebimento não encontrado");
	}
};
const handle_DeleteReceipt1 = async () => {
	if (await Api.Recebimentos.deletar(id_search_receipt)) {
		console.log("Recebimento deletado com sucesso");
	} else {
		console.log("Recebimento não encontrado");
	}
};

const id_search_receipt_recurring = 1;

const handle_Register_Receipt_Recurring = async () => {
	console.log(
		await Api.Recebimentos_Recorrentes.cadastrar(
			values_Register.receipt_recurring
		)
	);
};
const handle_FindAll_Receipts_Recurring = async () => {
	console.log(await Api.Recebimentos_Recorrentes.listar_todos());
};
const handle_FindReceipt_Recurring1ById = async () => {
	console.log(
		await Api.Recebimentos_Recorrentes.listar_especifico(
			id_search_receipt_recurring
		)
	);
};
const handle_UpdateReceipt_Recurring1AmountTo100 = async () => {
	const receipt = await Api.Recebimentos_Recorrentes.listar_especifico(
		id_search_receipt_recurring
	);
	if (receipt) {
		receipt.amount = 100;
		console.log(await Api.Recebimentos_Recorrentes.atualizar(receipt));
	} else {
		console.log("Recebimento não encontrado");
	}
};
const handle_MarkReceipt_Recurring1AsProcessed = async () => {
	const receipt = await Api.Recebimentos_Recorrentes.marcar_recebido(
		id_search_receipt_recurring
	);
	if (receipt) {
		console.log(receipt);
	} else {
		console.log("Recebimento não encontrado");
	}
};
const handle_DeleteReceipt_Recurring1 = async () => {
	if (await Api.Recebimentos_Recorrentes.deletar(id_search_receipt_recurring)) {
		console.log("Recebimento deletado com sucesso");
	} else {
		console.log("Recebimento não encontrado");
	}
};

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
				<View
					style={{
						borderColor: "white",
						padding: 5,
						borderWidth: 5,
						marginBottom: 5,
					}}
				>
					<Text>Recebimentos</Text>
					<Button onPress={handle_Register_Receipt}>
						Registrar Recebimento
					</Button>
					<Button onPress={handle_FindAll_Receipts}>Listar Recebimentos</Button>
					<Button onPress={handle_FindReceipt1ById}>
						Obter Recebimento (1)
					</Button>
					<Button onPress={handle_UpdateReceipt1AmountTo100}>
						Atualizar Recebimento (1)
					</Button>
					<Button onPress={handle_MarkReceipt1AsProcessed}>
						Informar que Recebimento foi executado (1)
					</Button>
					<Button onPress={handle_DeleteReceipt1}>
						Deletar Recebimento (1)
					</Button>
				</View>
				<View
					style={{
						borderColor: "white",
						padding: 5,
						borderWidth: 5,
						marginBottom: 5,
					}}
				>
					<Text>Recebimentos Recorrentes</Text>
					<Button onPress={handle_Register_Receipt_Recurring}>
						Registrar Recebimento Recorrente
					</Button>
					<Button onPress={handle_FindAll_Receipts_Recurring}>
						Listar Recebimentos Recorrente
					</Button>
					<Button onPress={handle_FindReceipt_Recurring1ById}>
						Obter Recebimento Recorrente (1)
					</Button>
					<Button onPress={handle_UpdateReceipt_Recurring1AmountTo100}>
						Atualizar Recebimento Recorrente (1)
					</Button>
					<Button onPress={handle_MarkReceipt_Recurring1AsProcessed}>
						Informar que Recebimento Recorrente foi executado (1)
					</Button>
					<Button onPress={handle_DeleteReceipt_Recurring1}>
						Deletar Recebimento Recorrente (1)
					</Button>
				</View>
			</View>
		</BaseView>
	);
}
