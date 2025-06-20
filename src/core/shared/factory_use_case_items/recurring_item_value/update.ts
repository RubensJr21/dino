import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../IRepositoryRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface UpdateRecurringItemValue_Input {
  id: number;
  data: StrictOmit<Recurring, "id">
}

export default abstract class UseCase_RecurringItemValue_Update implements IUseCase<UpdateRecurringItemValue_Input, Recurring>{
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the recurring item value update use case.
   * @param {IRepoRecurring} repo_rec - The repository for recurring item value operations
   */
  constructor(
    private repo_rec: IRepoRecurring
  ){}

  /**
   * Executes the update operation for a recurring item value.
   * @param {UpdateRecurringItemValue_Input} input - The input data for updating a recurring item value
   * @returns {Promise<Recurring>} The updated recurring item value or undefined if update fails
   */
  async execute(input: UpdateRecurringItemValue_Input): Promise<Recurring> {
    const {
      id,
      recurrence_type,
      created_at,
      updated_at,
      itens,
      ...data
    } = {
      ...input.data.properties,
      fk_id_recurrence_type: input.data.recurrence_type.id
    }

    return this.repo_rec.update(input.id, data)
  }
}