import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { InstallmentUnknownError, isInstallmentNotFoundById } from "../../errors/installment";
import { isItemValueNotFoundById, ItemValueNotFoundById } from "../../errors/item_value";
import { IRepoInstallment } from "../../interfaces/IRepositoryInstallment";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkInstallmentItemValueAsProcessed_Input {
  id: Installment["id"];
  item_value_id: ItemValue["id"];
}

export default abstract class UseCase_InstallmentItemValue_MarkAsProcessed implements IUseCase<MarkInstallmentItemValueAsProcessed_Input, Installment>{
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallment} repo_i - The repository for managing installments
   * @param {IRepoItemValue} repo_iv - The repository for managing itens value of installments
   */
  constructor(
    private repo_i: IRepoInstallment,
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Marks an installment item value as processed and updates its record in the repository
   * @param {MarkInstallmentItemValueAsProcessed_Input} input - The input containing the ID of the installment item value to process
   * @returns {Promise<Installment>} The updated installment item value
   * @throws {ItemValueNotFoundById} If the item value is not found   
   * @throws {InstallmentNotFoundError} If {@linkcode repo_i.findById} or {@linkcode repo_i.update} throws
   * @throws {InstallmentUnknownError} If an unexpected error occurs during processing
   */
  async execute(input: MarkInstallmentItemValueAsProcessed_Input): Promise<Installment> {
    try {
      const installment_item_value_searched = this.repo_i.findById(input.id)
      const item_value = installment_item_value_searched.itens.find((iv) => iv.id === input.item_value_id)
      if(!item_value){
        throw new ItemValueNotFoundById(input.item_value_id)
      }
      item_value.markAsProcessed()
      const {
        id: _,
        tag,
        transfer_method,
        ...item_value_transformed
      } = {
        ...item_value.properties,
        fk_id_tag: item_value.properties.tag.id,
        fk_id_transfer_method: item_value.properties.transfer_method.id,
      }
      this.repo_iv.update(input.item_value_id, item_value_transformed);      
      return this.repo_i.findById(input.id)
    } catch (error) {
      if(isInstallmentNotFoundById(error)){
        throw error
      }
      if(isItemValueNotFoundById(error)){
        throw error
      }
      throw new InstallmentUnknownError()
    }
  }
}