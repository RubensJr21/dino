import { ItemValue } from "@core/entities/item_value.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoItemValue } from "@src/infrastructure/repositories/drizzle/item_value.repository";
import { TypeOfVariants } from "../../types/variants_items";

interface UpdateItemValue_Input {
  id: number;
  data: StrictOmit<ItemValue, "id">
}

export default abstract class UseCase_ItemValue_Update implements IUseCase<UpdateItemValue_Input, ItemValue>{
  abstract variant: TypeOfVariants;
  /**
   * Constructs an instance of the ItemValue update use case
   * @param {IRepoItemValue} repo_iv - The repository for item value operations
   */
  constructor(
    private repo_iv: IRepoItemValue
  ){}
  /**
   * Executes the update operation for an ItemValue
   * @param {UpdateItemValue_Input} input - The input data for updating an ItemValue
   * @returns {Promise<ItemValue>} The updated ItemValue or undefined if update fails
   */
  async execute(input: UpdateItemValue_Input): Promise<ItemValue> {
    const {
      id,
      tag,
      transfer_method_type,
      created_at,
      updated_at,
      ...data
    } = {
      ...input.data.properties,
      fk_id_tag: input.data.tag.id,
      fk_id_transfer_method_type: input.data.transfer_method_type.id
    }

    return this.repo_iv.update(input.id, data)
  }
}