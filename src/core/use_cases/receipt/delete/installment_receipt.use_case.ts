import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";

interface DeleteInstallmentReceipt_Input {
    id: number
}

export default class DeleteInstallmentReceipt implements IUseCase<DeleteInstallmentReceipt_Input, boolean>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iiv: IRepoInstallmentItemValue
    ){}
    async execute(input: DeleteInstallmentReceipt_Input): Promise<boolean> {
        const installment_receipt = await this.repo_iiv.findById(input.id)
        if(installment_receipt){
            // Removendo o base_item_value a remoção é propagada
            await this.repo_biv.delete(installment_receipt.base_item_value.id)
        } else {
            throw new Error("Installment Receipt not found!");
        }
        return true;
    }
}