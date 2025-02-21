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

import { RepositoryReceiptMemory } from "@api/adapters/receipt/RepositoryReceiptMemory";
import RegisterReceipt from "@core/receipt/use_cases/RegisterReceipt";
import Receipt from "./core/receipt/model/Receipt";

const repository_receipt = new RepositoryReceiptMemory();

const registrar_receipt = new RegisterReceipt(repository_receipt);

registrar_receipt
	.execute({
		description: "",
		type: "",
		schedule_at: new Date(),
		amount: 0,
		was_processed: false,
		transfer_method_type: "",
		tag: "",
	})
	.then((r: Receipt) => {
		console.log(r);
		console.log("Recebimento registrado com sucesso!");
	})
	.catch((error) => {
		console.error("Erro ao registrar recebimento: ", error);
	});
