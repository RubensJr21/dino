import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/item_value.repository";
import { InstallmentUnknownError, isInstallmentNotFoundById } from "../../errors/installment";
import { isItemValueNotFoundById, ItemValueNotFoundById } from "../../errors/item_value";
import { IRepoInstallment } from "../../interfaces/IRepositoryInstallment";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkInstallmentItemValueAsUnprocessed_Input {
  id: Installment["id"],
  item_value_id: ItemValue["id"];
}

export default abstract class UseCase_InstallmentItemValue_MarkAsUnprocessed implements IUseCase<MarkInstallmentItemValueAsUnprocessed_Input, Installment>{
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallment} repo_i Instância de um repositório de Installment Item Value
   * @param {IRepoItemValue} repo_iv - The repository for managing itens value of installments
   */
  constructor(
    private repo_i: IRepoInstallment,
        private repo_iv: IRepoItemValue
  ){}
  /**
   * Unmarks an installment item value as processed
   * @param {MarkInstallmentItemValueAsUnprocessed_Input} input - The input containing the ID of the installment item value to unmark
   * @returns {Promise<Installment>} The updated installment item value
   * @throws {ItemValueNotFoundById} If the item value is not found
   * @throws {InstallmentNotFoundById} If the installment item value is not found
   * @throws {InstallmentUnknownError} If an unexpected error occurs during processing
   */
  public async execute(input: MarkInstallmentItemValueAsUnprocessed_Input): Promise<Installment> {
    try {
      const installment_item_value_searched = this.repo_i.findById(input.id)
      const item_value = installment_item_value_searched.itens.find((iv) => iv.id === input.item_value_id)
      if(!item_value){
        throw new ItemValueNotFoundById(input.item_value_id)
      }
      item_value.markAsProcessed()
      const properties = installment_item_value_searched.properties
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
      if(isInstallmentNotFoundById(error)) {
        throw error
      }
      if(isItemValueNotFoundById(error)){
        throw error
      }
      throw new InstallmentUnknownError()
    }
  }
}