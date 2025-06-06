import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";
import { TypeOfVariants } from "../../types/variants_items";

interface UpdateRecurringItemValue_Input {
  id: number;
  data: StrictOmit<RecurringItemValue, "id">
}

export default abstract class UseCase_RecurringItemValue_Update implements IUseCase<UpdateRecurringItemValue_Input, RecurringItemValue>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the recurring item value update use case.
   * @param {IRepoRecurringItemValue} repo_riv - The repository for recurring item value operations
   */
  constructor(
    private repo_riv: IRepoRecurringItemValue
  ){}

  /**
   * Executes the update operation for a recurring item value.
   * @param {UpdateRecurringItemValue_Input} input - The input data for updating a recurring item value
   * @returns {Promise<RecurringItemValue>} The updated recurring item value or undefined if update fails
   */
  async execute(input: UpdateRecurringItemValue_Input): Promise<RecurringItemValue> {
    const {
      id,
      tag,
      transfer_method_type,
      recurrence_type,
      created_at,
      updated_at,
      ...data
    } = {
      ...input.data.properties,
      fk_id_tag: input.data.tag.id,
      fk_id_transfer_method_type: input.data.transfer_method_type.id,
      fk_id_recurrence_type: input.data.recurrence_type.id
    }

    return this.repo_riv.update(input.id, data)
  }
}