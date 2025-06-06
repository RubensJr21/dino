import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@src/infrastructure/repositories/drizzle/item_value.repository";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

export default abstract class ListAllReceipts implements IUseCase<void, ItemValue[]> {
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs a new instance of the list all receipts use case.
   * @param {IRepoItemValue} repo_iv - The repository for item values used to retrieve data.
   */
  constructor(
    private repo_iv: IRepoItemValue,
  ){}
  /**
   * Executes the use case to retrieve and filter item values based on the specified variant.
   * @returns {Promise<ItemValue[]>} A promise that resolves to an array of filtered item values.
   */
  async execute(): Promise<ItemValue[]> {
    const item_values = this.repo_iv.findAll()
    return item_values.filter((iv) => {
      return iv.type === Variants_Of_ItemValue[this.variant]
    });
  }
}