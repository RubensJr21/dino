import IUseCase from "@core/shared/IUseCase";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkRecurringItemValueAsUnprocessed_Input {
  id: Recurring["id"];
  item_value_id: ItemValue["id"];
}

export default abstract class Create_UseCase_RecurringItemValue_MarkAsUnprocessed implements IUseCase<MarkRecurringItemValueAsUnprocessed_Input, boolean>{
  protected abstract variant: TypeOfVariants
  
  constructor(
    private repo_rec: IRepoRecurring,
    private repo_iv: IRepoItemValue
  ){}
  
  async execute(input: MarkRecurringItemValueAsUnprocessed_Input): Promise<boolean> {
    const item_value_searched = this.repo_rec.findItemValue(input.id, input.item_value_id);
    if (item_value_searched.success) {
      const item_value = item_value_searched.data
      item_value.markAsUnprocessed()
      const {
        id,
        tag,
        transfer_method,
        ...data
      } = {
        ...item_value.properties,
        fk_id_tag: item_value.tag.id,
        fk_id_transfer_method: item_value.transfer_method.id
      }
      this.repo_iv.update(id, data);
      return true;
    }
    return false;
  }
}