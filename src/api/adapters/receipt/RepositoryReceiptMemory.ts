import { RegisterRepositoryDTO } from "@/api/core/_shared/ports/RepositoryInterface";
import { withObject } from "@/utils/objectHelpers";
import Receipt from "@core/receipt/model/Receipt";
import RepositoryReceipt from "@core/receipt/ports/RepositoryReceipt";

export class RepositoryReceiptMemory implements RepositoryReceipt {
	private receipts: Receipt[] = [];
	private static general_id: Receipt["id"] = 1;
	private static gerar_id() {
		return RepositoryReceiptMemory.general_id++;
	}
	async register(entity: RegisterRepositoryDTO<Receipt>): Promise<Receipt> {
		const receipt = {
			...entity,
			id: RepositoryReceiptMemory.gerar_id(),
		};
		this.receipts.push(receipt);
		return receipt;
	}

	async find(id: Receipt["id"]): Promise<Receipt | undefined> {
		return this.receipts.find((receipt) => receipt.id === id);
	}

	async findAll(): Promise<Receipt[]> {
		return this.receipts;
	}

	async update(entity: Receipt): Promise<Receipt> {
		const index = this.receipts.findIndex(
			(receipt) => receipt.id === entity.id
		);
		this.receipts[index] = entity;
		return entity;
	}

	async delete(entity: Receipt): Promise<boolean> {
		const index = this.receipts.findIndex(
			(receipt) => receipt.id === entity.id
		);
		this.receipts.splice(index, 1);
		return true;
	}

	async mark_receipt_as_executed(id: Receipt["id"]): Promise<Receipt> {
		const index = this.receipts.findIndex((receipt) => receipt.id === id);

		var receipt: Receipt = withObject(this.receipts[index], (inner_receipt) => {
			return {
				...inner_receipt,
				was_processed: true,
			};
		});

		this.receipts[index] = receipt;

		return receipt;
	}
}
