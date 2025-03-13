/*
    Para esse ponto serão enviadas todas as requisições, tais como:
    - Registrar um novo recebimento
    - Listar todos os recebimentos
    - Listar um recebimento específico
    - Atualizar um recebimento
    - Deletar um recebimento
    - Informar que um recebimento foi executado
    - Informar o método específico de recebimento
*/

import { RepositoryReceiptSQLite } from "@api/adapters/receipt/RepositoryReceiptSQLite";
import Database from "@api/database/Database";
import Receipt from "@core/receipt/model/Receipt";
import { RepositoryReceipt_BaseRegisterParam } from "@core/receipt/ports/IRepositoryReceipt_Base";
import RegisterReceipt from "@core/receipt/use_cases/RegisterReceipt";
import { RepositoryReceipt_RecurringSQLite } from "./adapters/receipt/RepositoryReceipt_RecurringSQLite";
import Receipt_Recurring from "./core/receipt/model/Receipt_Recurring";
import { RepositoryReceipt_RecurringRegisterParam } from "./core/receipt/ports/IRepositoryReceipt_Recurring";
import DeleteReceipt from "./core/receipt/use_cases/DeleteReceipt";
import FindAllReceipts from "./core/receipt/use_cases/FindAllReceipt";
import FindReceiptById from "./core/receipt/use_cases/FindReceiptById";
import MarkReceiptAsProcessed from "./core/receipt/use_cases/MarkReceiptAsProcessed";
import UpdateReceipt from "./core/receipt/use_cases/UpdateReceipt";
import DeleteReceipt_Recurring from "./core/receipt/use_cases/recurring/DeleteReceipt_Recurring";
import FindAllReceipts_Recurring from "./core/receipt/use_cases/recurring/FindAllReceipt_Recurring";
import FindReceipt_RecurringById from "./core/receipt/use_cases/recurring/FindReceipt_RecurringById";
import MarkReceipt_RecurringAsProcessed from "./core/receipt/use_cases/recurring/MarkReceipt_RecurringAsProcessed";
import RegisterReceipt_Recurring from "./core/receipt/use_cases/recurring/RegisterReceipt_Recurring";
import UpdateReceipt_Recurring from "./core/receipt/use_cases/recurring/UpdateReceipt_Recurring";

const db = new Database("test");
console.log("Conexão aberta");

export default class API {
	static readonly repository_receipt = new RepositoryReceiptSQLite(db);
	static readonly repository_receipt_recurring =
		new RepositoryReceipt_RecurringSQLite(db);

	private static async cadastrarRecebimento(
		data: RepositoryReceipt_BaseRegisterParam
	): Promise<Receipt | undefined> {
		const registrar_receipt = new RegisterReceipt(API.repository_receipt);

		return await registrar_receipt
			.execute(data)
			.then((receipt) => {
				console.log("Recebimento registrado com sucesso!");
				return receipt;
			})
			.catch((error) => {
				console.error("Erro ao registrar recebimento: ", error);
				return undefined;
			});
	}
	private static async listarRecebimentoEspecifico(
		id: Receipt["id"]
	): Promise<Receipt | undefined> {
		return new FindReceiptById(API.repository_receipt).execute(id);
	}
	private static async listarRecebimentos(): Promise<Receipt[]> {
		return new FindAllReceipts(API.repository_receipt).execute();
	}
	private static async atualizarRecebimento(
		data: Receipt
	): Promise<Receipt | undefined> {
		return new UpdateReceipt(API.repository_receipt).execute(data);
	}
	private static async deletarRecebimento(id: Receipt["id"]): Promise<boolean> {
		return new DeleteReceipt(API.repository_receipt).execute(id);
	}
	private static async marcarRecebimentoComoProcessado(
		id: Receipt["id"]
	): Promise<Receipt | undefined> {
		return new MarkReceiptAsProcessed(API.repository_receipt).execute(id);
	}

	public static readonly Recebimentos = {
		cadastrar: API.cadastrarRecebimento,
		listar_todos: API.listarRecebimentos,
		listar_especifico: API.listarRecebimentoEspecifico,
		atualizar: API.atualizarRecebimento,
		deletar: API.deletarRecebimento,
		marcar_recebido: API.marcarRecebimentoComoProcessado,
	};

	static async cadastrarRecebimentoRecorrente(
		data: RepositoryReceipt_RecurringRegisterParam
	): Promise<Receipt_Recurring | undefined> {
		const registrar_receipt = new RegisterReceipt_Recurring(
			API.repository_receipt_recurring
		);

		return await registrar_receipt
			.execute(data)
			.then((receipt) => {
				console.log("Recebimento registrado com sucesso!");
				return receipt;
			})
			.catch((error) => {
				console.error("Erro ao registrar recebimento: ", error);
				return undefined;
			});
	}
	private static async listarRecebimentoRecorrenteEspecifico(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined> {
		return new FindReceipt_RecurringById(
			API.repository_receipt_recurring
		).execute(id);
	}
	private static async listarRecebimentosRecorrentes(): Promise<
		Receipt_Recurring[]
	> {
		return new FindAllReceipts_Recurring(
			API.repository_receipt_recurring
		).execute();
	}
	private static async atualizarRecebimentoRecorrente(
		data: Receipt_Recurring
	): Promise<Receipt_Recurring | undefined> {
		return new UpdateReceipt_Recurring(
			API.repository_receipt_recurring
		).execute(data);
	}
	private static async deletarRecebimentoRecorrente(
		id: Receipt_Recurring["id"]
	): Promise<boolean> {
		return new DeleteReceipt_Recurring(
			API.repository_receipt_recurring
		).execute(id);
	}
	private static async marcarRecebimentoRecorrenteComoProcessado(
		id: Receipt_Recurring["id"]
	): Promise<Receipt_Recurring | undefined> {
		return new MarkReceipt_RecurringAsProcessed(
			API.repository_receipt_recurring
		).execute(id);
	}

	public static readonly Recebimentos_Recorrentes = {
		cadastrar: API.cadastrarRecebimentoRecorrente,
		listar_especifico: API.listarRecebimentoRecorrenteEspecifico,
		listar_todos: API.listarRecebimentosRecorrentes,
		atualizar: API.atualizarRecebimentoRecorrente,
		deletar: API.deletarRecebimentoRecorrente,
		marcar_recebido: API.marcarRecebimentoRecorrenteComoProcessado,
	};
}
