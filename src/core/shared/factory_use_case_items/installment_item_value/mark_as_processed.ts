import IUseCase from "@core/shared/IUseCase";
import { InstallmentItemValue } from "@src/core/entities/installment.entity";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/installment.repository";
import { InstallmentItemValueUnknownError, isInstallmentItemValueNotFoundById } from "../../errors/installment";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkInstallmentItemValueAsProcessed_Input {
  id: number
}

export default abstract class UseCase_InstallmentItemValue_MarkAsProcessed implements IUseCase<MarkInstallmentItemValueAsProcessed_Input, InstallmentItemValue>{
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallmentItemValue} repo_iiv - The repository for managing installment item values
   */
  constructor(
    private repo_iiv: IRepoInstallmentItemValue
  ){}
  /**
   * Marks an installment item value as processed and updates its record in the repository
   * @param {MarkInstallmentItemValueAsProcessed_Input} input - The input containing the ID of the installment item value to process
   * @returns {Promise<InstallmentItemValue>} The updated installment item value
   * @throws {InstallmentItemValueNotFoundError} If {@linkcode repo_iiv.findById} or {@linkcode repo_iiv.update} throws
   * @throws {InstallmentItemValueUnknownError} If an unexpected error occurs during processing
   */
  async execute(input: MarkInstallmentItemValueAsProcessed_Input): Promise<InstallmentItemValue> {
    try {
      const installment_item_value_searched = this.repo_iiv.findById(input.id)
      installment_item_value_searched.markAsProcessed()
      const properties = installment_item_value_searched.properties
      const {
        id,
        tag,
        transfer_method_type,
        created_at,
        updated_at,
        ...props
      } = {
        ...properties,
        fk_id_tag: properties.tag.id,
        fk_id_transfer_method_type: properties.transfer_method_type.id
      }
      
      return this.repo_iiv.update(id, props)
    } catch (error) {
      if(isInstallmentItemValueNotFoundById(error)){
        throw error
      }
      throw new InstallmentItemValueUnknownError()
    }
  }
}