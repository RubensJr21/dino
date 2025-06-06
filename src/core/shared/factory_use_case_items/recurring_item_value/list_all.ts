import { RecurringItemValue } from "@core/entities/recurring_item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoRecurringItemValue } from "@src/infrastructure/repositories/drizzle/recurring_item_value.repository";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

export default abstract class UseCase_RecurringItemValue_ListaAll implements IUseCase<void, RecurringItemValue[]> {
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the use case with a repository for recurring item values.
   * @param {IRepoRecurringItemValue} repo_riv The repository used to fetch recurring item values.
   */
  constructor(
    private repo_riv: IRepoRecurringItemValue
  ){}
  /**
   * Executes the use case to retrieve recurring item values filtered by the specified variant.
   * @returns {Promise<RecurringItemValue[]>} A promise that resolves to an array of RecurringItemValue matching the variant type.
   */
  async execute(): Promise<RecurringItemValue[]> {
    const item_values = this.repo_riv.findAll()
    return item_values.filter((riv) => {
      return riv.type === Variants_Of_ItemValue[this.variant]
    });
  }
}