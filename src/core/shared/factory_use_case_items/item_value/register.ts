import IUseCase from "@core/shared/IUseCase";
import { IBaseItemValue } from "@src/core/entities/item_value.entity";
import { ItemValue } from "@src/core/entities/standard.entity";
import { IRepoItemValue } from "@src/infrastructure/repositories/standard.repository";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

type RegisterInput = StrictOmit<IBaseItemValue, "fk_id_base_item_value"|"was_processed"|"created_at"|"updated_at">

export default abstract class UseCase_ItemValue_Register implements IUseCase<RegisterInput, ItemValue> {
  protected abstract variant: TypeOfVariants;
  /**
   * Constructs a new UseCase_ItemValue_Register instance
   * @param {IRepoItemValue} repo_iv Repository for item value operations
   */
  constructor(
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Executes the registration of an item value
   * @param {RegisterInput} input - The input data for creating an item value
   * @returns {Promise<ItemValue>} The created item value
   */
  async execute(input: RegisterInput): Promise<ItemValue> {
    const {
      tag,
      transfer_method_type
    } = input

    const item_value = this.repo_iv.create({
      description: input.description,
      type: Variants_Of_ItemValue[this.variant],
      scheduled_at: input.scheduled_at,
      amount: input.amount,
      was_processed: false,
      fk_id_tag: tag.id,
      fk_id_transfer_method_type: transfer_method_type.id,
    })

    return item_value;
  }
}