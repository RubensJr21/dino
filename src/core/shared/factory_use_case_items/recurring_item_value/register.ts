import { IRecurringItemValue, RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

type RegisterRecurringInput = StrictOmit<IRecurringItemValue, "fk_id_base_item_value"|"was_processed"|"created_at"|"updated_at">

export default abstract class UseCase_RecurringItemValue_Register implements IUseCase<RegisterRecurringInput, RecurringItemValue> {
  protected abstract variant: TypeOfVariants
  /**
   * Constructs a new instance of the recurring item value registration use case.
   * @param {IRepoRecurringItemValue} repo_riv - The repository for recurring item values used in the registration process.
   */
  constructor(
    private repo_riv: IRepoRecurringItemValue
  ){}
  /**
   * Executes the registration of a recurring item value.
   * @param {RegisterRecurringInput} input - The input data for creating a recurring item value.
   * @returns {Promise<RecurringItemValue>} A promise that resolves to the created recurring item value.
   */
  async execute(input: RegisterRecurringInput): Promise<RecurringItemValue> {
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