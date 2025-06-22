import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { InstallmentNotFoundById } from "../../errors/installment";
import { IRepoInstallment } from "../../interfaces/IRepositoryInstallment";

interface UpdateItemInstallment_Input {
  id: Installment["id"];
  item: ItemValue
}

export default abstract class UseCase_Installment_UpdateItem implements IUseCase<UpdateItemInstallment_Input, Installment>{
  /**
   * Construtor da Classe UseCase_Installment_UpdateItem
   * @param {IRepoInstallment} repo_i ""
   * @param {IRepoItemValue} repo_iv ""
   */
  constructor(
    private repo_i: IRepoInstallment,
    private repo_iv: IRepoItemValue
  ){}
  
  /**
   * Executes the update process for an installment item value
   * @param {UpdateItemInstallment_Input} input - The input data for updating the installment item value
   * @returns {Promise<Installment>} The updated installment item value
   */
  async execute(input: UpdateItemInstallment_Input): Promise<Installment> {
    const installment = this.repo_i.findById(input.id)
    if(!installment){
      // ATTENTION: Declarar o laçamento do erro
      throw new InstallmentNotFoundById(input.id);
    }

    const installment_item_value = this.repo_iv.findById(input.item.id)

    if(!installment_item_value){
      throw new Error("Este item não está relacionado à esse parcelamento.");
    }

    const {
      id,
      ...iv
    } = {
      ...installment_item_value.properties,
      fk_id_tag: installment_item_value.tag.id,
      fk_id_transfer_method: installment_item_value.transfer_method.id,
    }
    
    this.repo_iv.update(id, iv)
    return this.repo_i.findById(input.id)
  }
}