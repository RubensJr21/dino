import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";

interface FindInstallmentReceiptById_Input {
    id: number
}

export default class FindInstallmentReceiptById implements IUseCase<FindInstallmentReceiptById_Input, ItemValue> {
    constructor(
        private repo_iiv: IRepoInstallmentItemValue
    ){}
    async execute(input: FindInstallmentReceiptById_Input): Promise<ItemValue> {
        const payment = await this.repo_iiv.findById(input.id)
        if(!payment){
            throw new Error("Installment Receipt not found!");
        }
        return payment
    }
}