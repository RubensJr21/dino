import { InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/drizzle/installment_item_value.repository";
import { InstallmentItemValueUnknownError, isInstallmentItemValueNotFoundById } from "../../errors/installment_item_value";
import { TypeOfVariants } from "../../types/variants_items";

interface UnmarkInstallmentItemValueAsProcessed_Input {
  id: number
}

export default abstract class UseCase_InstallmentItemValue_UnmarkAsProcessed implements IUseCase<UnmarkInstallmentItemValueAsProcessed_Input, InstallmentItemValue>{
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallmentItemValue} repo_iiv Instância de um repositório de Installment Item Value
   */
  constructor(
    private repo_iiv: IRepoInstallmentItemValue
  ){}
  /**
   * Unmarks an installment item value as processed
   * @param {UnmarkInstallmentItemValueAsProcessed_Input} input - The input containing the ID of the installment item value to unmark
   * @returns {Promise<InstallmentItemValue>} The updated installment item value
   * @throws {InstallmentItemValueNotFoundById} If the installment item value is not found
   * @throws {InstallmentItemValueUnknownError} If an unexpected error occurs during processing
   */
  public async execute(input: UnmarkInstallmentItemValueAsProcessed_Input): Promise<InstallmentItemValue> {
    try {
      const installment_item_value = this.repo_iiv.findById(input.id)
      installment_item_value.markAsProcessed()
  
      const {
        id,
        tag,
        transfer_method_type,
        created_at,
        updated_at,
        ...data
      } = {
        ...installment_item_value.properties,
        fk_id_tag: installment_item_value.tag.id,
        fk_id_transfer_method_type: installment_item_value.transfer_method_type.id
      }
  
      return this.repo_iiv.update(id, data)
    } catch (error) {
      if(isInstallmentItemValueNotFoundById(error)) {
        throw error
      }
      throw new InstallmentItemValueUnknownError()
    }
  }
}