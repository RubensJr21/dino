import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { Result } from "../../types/Result";

interface UpdateItemInstallment_Input {
  id: Installment["id"];
  item: ItemValue
}

type Return = Result<ItemValue>

export default abstract class UseCase_Installment_UpdateItem implements IUseCase<UpdateItemInstallment_Input, Return> {
  constructor(
    private repo_i: IRepoInstallment,
    private repo_iv: IRepoItemValue
  ){}
  async execute(input: UpdateItemInstallment_Input): Promise<Return> {
    const installment = this.repo_i.findById(input.id)
    if(!installment.success){
      return {
        success: false,
        error: installment.error
      }
    }

    const installment_item_value = this.repo_iv.findById(input.item.id)

    if(!installment_item_value){
      return {
        success: false,
        error: "Este item não está relacionado à esse parcelamento."
      }
    }

    const {
      id,
      ...iv
    } = {
      ...installment_item_value.properties,
      fk_id_tag: installment_item_value.tag.id,
      fk_id_transfer_method: installment_item_value.transfer_method.id,
    }
    
    const item_value_updated = this.repo_iv.update(id, iv);

    if(!item_value_updated.success){
      return {
        success: false,
        error: "Erro ao atualizar o item value"
      }
    }

    return {
      success: true,
      data: item_value_updated.data
    }
  }
}