import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoItemValue } from "@core/shared/RepositoryTypes";

interface DeletePayment_Input {
    id: number
}

export default class DeletePayment implements IUseCase<DeletePayment_Input, boolean>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iv: IRepoItemValue
    ){}
    async execute(input: DeletePayment_Input): Promise<boolean> {
        const receipt = await this.repo_iv.findById(input.id)
        if(receipt){
            // Removendo o base_item_value a remoção é propagada
            await this.repo_biv.delete(receipt.base_item_value.id)
        } else {
            throw new Error("Payment not found!");
        }
        return true;
    }
}