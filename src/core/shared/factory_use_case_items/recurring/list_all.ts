import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepositoryRecurring";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

export default abstract class UseCase_Recurring_ListAll implements IUseCase<void, Recurring[]> {
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the use case with a repository for recurrings.
   * @param {IRepoRecurring} repo_riv The repository used to fetch recurrings.
   */
  constructor(
    private repo_riv: IRepoRecurring
  ){}
  /**
   * Executes the use case to retrieve recurrings filtered by the specified variant.
   * @returns {Promise<Recurring[]>} A promise that resolves to an array of Recurring matching the variant type.
   */
  async execute(): Promise<Recurring[]> {
    return this.repo_riv.findAllByCashflowType(Variants_Of_ItemValue[this.variant]);
  }
}