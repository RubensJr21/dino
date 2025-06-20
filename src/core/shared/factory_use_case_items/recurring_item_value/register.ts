import IUseCase from "@core/shared/IUseCase";
import { IRecurring, Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../IRepositoryRecurring";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

type RegisterRecurringInput = StrictOmit<IRecurring, "created_at"|"updated_at">

export default abstract class UseCase_RecurringItemValue_Register implements IUseCase<RegisterRecurringInput, Recurring> {
  protected abstract variant: TypeOfVariants
  /**
   * Constructs a new instance of the recurring item value registration use case.
   * @param {IRepoRecurring} repo_riv - The repository for recurring item values used in the registration process.
   */
  constructor(
    private repo_riv: IRepoRecurring
  ){}
  /**
   * Executes the registration of a recurring item value.
   * @param {RegisterRecurringInput} input - The input data for creating a recurring item value.
   * @returns {Promise<Recurring>} A promise that resolves to the created recurring item value.
   */
  async execute(input: RegisterRecurringInput): Promise<Recurring> {
    const {
      tag,
      transfer_method_type,
      recurrence_type
    } = input
    
    const installment_item_value = this.repo_riv.create({
      is_disabled: false,
      description: input.description,
      type: Variants_Of_ItemValue[this.variant],
      scheduled_at: input.scheduled_at,
      amount: input.amount,
      was_processed: false,
      fk_id_tag: tag.id,
      fk_id_transfer_method_type: transfer_method_type.id,
      fk_id_recurrence_type: recurrence_type.id,
    })    
    return installment_item_value;
  }
}