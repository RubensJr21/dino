import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { TypeOfVariants } from "../../types/variants_items";

interface MarkInstallmentItemValueAsUnprocessed_Input {
  id: Installment["id"],
  item_value_id: ItemValue["id"];
}

export default abstract class UseCase_InstallmentItemValue_MarkAsUnprocessed implements IUseCase<MarkInstallmentItemValueAsUnprocessed_Input, boolean> {
  protected abstract variant: TypeOfVariants
  constructor(
    private repo_i: IRepoInstallment,
    private repo_iv: IRepoItemValue
  ) { }
  public async execute(input: MarkInstallmentItemValueAsUnprocessed_Input): Promise<boolean> {
    const item_value_searched = this.repo_i.findItemValue(input.id, input.item_value_id);
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