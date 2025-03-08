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
import RegisterReceipt from "@core/receipt/use_cases/RegisterReceipt";
import { RepositoryReceiptRegisterParam } from "./core/receipt/ports/IRepositoryReceipt_Base";

const db = new Database("test.db");
console.log("Conexão aberta");

export default class API {
	static readonly repository_receipt = new RepositoryReceiptSQLite(db);

	static async cadastrarRecebimento(
		data: RepositoryReceiptRegisterParam
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

	static async listarRecebimentos(): Promise<Receipt[]> {
		return await API.repository_receipt.findAll();
	}
	static async listarRecebimentoEspecifico(
		id: Receipt["id"]
	): Promise<Receipt | undefined> {
		return API.repository_receipt.findById(id);
	}
	static async atualizarRecebimento(
		data: Receipt
	): Promise<Receipt | undefined> {
		return API.repository_receipt.update(data);
	}
	static async deletarRecebimento(id: Receipt["id"]): Promise<boolean> {
		return API.repository_receipt.delete(id);
	}
	static async informarRecebimentoProcessado(
		id: Receipt["id"]
	): Promise<Receipt | undefined> {
		return API.repository_receipt.mark_receipt_as_processed(id);
	}
}
