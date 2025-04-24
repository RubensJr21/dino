import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoInstallmentItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../../types/variants_items";

interface DeleteInstallmentItemValue_Input {
    id: number
}
export default function Create_UseCase_InstallmentItemValue_Delete(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_InstallmentItemValue_Delete implements IUseCase<DeleteInstallmentItemValue_Input, boolean>{
        constructor(
            private repo_biv: IRepoBaseItemValue,
            private repo_iiv: IRepoInstallmentItemValue
        ){}
        async execute(input: DeleteInstallmentItemValue_Input): Promise<boolean> {
            const installment_receipt = await this.repo_iiv.findById(input.id)
            if(installment_receipt){
                // Removendo o base_item_value a remoção é propagada
                await this.repo_biv.delete(installment_receipt.base_item_value.id)
            } else {
                throw new Error(`Installment ${variant} not found!`);
            }
            return true;
        }
    }
}