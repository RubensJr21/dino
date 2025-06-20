import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../IRepositoryRecurring";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

export default abstract class UseCase_RecurringItemValue_ListaAll implements IUseCase<void, Recurring[]> {
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the use case with a repository for recurring item values.
   * @param {IRepoRecurring} repo_riv The repository used to fetch recurring item values.
   */
  constructor(
    private repo_riv: IRepoRecurring
  ){}
  /**
   * Executes the use case to retrieve recurring item values filtered by the specified variant.
   * @returns {Promise<Recurring[]>} A promise that resolves to an array of Recurring matching the variant type.
   */
  async execute(): Promise<Recurring[]> {
    const item_values = this.repo_riv.findAll()
    return item_values.filter((riv) => {
      return riv.type === Variants_Of_ItemValue[this.variant]
    });
  }
}