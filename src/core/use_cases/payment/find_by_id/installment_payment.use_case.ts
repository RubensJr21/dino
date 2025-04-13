import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";

interface FindInstallmentPaymentById_Input {
    id: number
}

export default class FindInstallmentPaymentById implements IUseCase<FindInstallmentPaymentById_Input, ItemValue> {
    constructor(
        private repo_iiv: IRepoInstallmentItemValue
    ){}
    async execute(input: FindInstallmentPaymentById_Input): Promise<ItemValue> {
        const payment = await this.repo_iiv.findById(input.id)
        if(!payment){
            throw new Error("Installment Payment not found!");
        }
        return payment
    }
}