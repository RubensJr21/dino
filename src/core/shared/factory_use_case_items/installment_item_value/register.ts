import { IInstallmentItemValue, InstallmentItemValue } from "@core/entities/installment_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallmentItemValue } from "@src/infrastructure/repositories/drizzle/installment_item_value.repository";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

type RegisterInstallmentInput = StrictOmit<IInstallmentItemValue, "fk_id_base_item_value"|"was_processed"|"created_at"|"updated_at">

export default abstract class UseCase_InstallmentItemValue_Register implements IUseCase<RegisterInstallmentInput, InstallmentItemValue> {
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the use case with the required installment item value repository
   * @param {IRepoInstallmentItemValue} repo_iiv The repository for managing installment item value operations
   */
  constructor(
    private repo_iiv: IRepoInstallmentItemValue,
  ){}
  /**
   * Executes the registration of an installment item value
   * @param {RegisterInstallmentInput} input The input data for creating an installment item value
   * @returns {Promise<InstallmentItemValue>} The created installment item value
   */
  async execute(input: RegisterInstallmentInput): Promise<InstallmentItemValue> {
    const {
      tag,
      transfer_method_type
    } = input
    
    const installment_item_value = this.repo_iiv.create({
      installments_number: input.installments_number,
      description: input.description,
      type: Variants_Of_ItemValue[this.variant],
      scheduled_at: input.scheduled_at,
      amount: input.amount,
      was_processed: false,
      fk_id_tag: tag.id,
      fk_id_transfer_method_type: transfer_method_type.id,
    })    
    return installment_item_value;
  }
}