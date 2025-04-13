import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";

interface DeleteInstallmentPayment_Input {
    id: number
}

export default class DeleteInstallmentPayment implements IUseCase<DeleteInstallmentPayment_Input, boolean>{
    constructor(
        private repo_biv: IRepoBaseItemValue,
        private repo_iiv: IRepoInstallmentItemValue
    ){}
    async execute(input: DeleteInstallmentPayment_Input): Promise<boolean> {
        const installment_receipt = await this.repo_iiv.findById(input.id)
        if(installment_receipt){
            // Removendo o base_item_value a remoção é propagada
            await this.repo_biv.delete(installment_receipt.base_item_value.id)
        } else {
            throw new Error("Installment Payment not found!");
        }
        return true;
    }
}