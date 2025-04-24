import IUseCase from "@core/shared/IUseCase";
import { IRepoBaseItemValue, IRepoItemValue } from "@core/shared/RepositoryTypes";
import { Variants_Of_ItemValue } from "../../types/variants_items";

interface DeleteItemValue_Input {
    id: number
}

export default function Create_UseCase_ItemValue_Delete(variant: keyof typeof Variants_Of_ItemValue){
    return class UseCase_ItemValue_Delete implements IUseCase<DeleteItemValue_Input, boolean>{
        constructor(
            private repo_biv: IRepoBaseItemValue,
            private repo_iv: IRepoItemValue
        ){}
        async execute(input: DeleteItemValue_Input): Promise<boolean> {
            const receipt = await this.repo_iv.findById(input.id)
            if(receipt){
                // Removendo o base_item_value a remoção é propagada
                await this.repo_biv.delete(receipt.base_item_value.id)
            } else {
                throw new Error(`${variant} not found!`);
            }
            return true;
        }
    }
}