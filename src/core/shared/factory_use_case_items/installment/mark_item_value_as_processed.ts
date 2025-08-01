import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: Installment["id"];
  item_value_id: ItemValue["id"];
}

type UseCaseInterface = IUseCase<Input, Installment>

export default abstract class MarkInstallmentItemValueAsProcessed implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(
    private repo_i: IRepoInstallment,
    private repo_iv: IRepoItemValue
  ) { }

  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const item_value_searched = this.repo_i.find_item_value(input.id, input.item_value_id);

    if (!item_value_searched.success) {
      const scope = `MarkInstallmentItemValueAsProcessed(${this.repo_i.find_by_id.name}) > ${item_value_searched.error.scope}`
      return {
        success: false,
        error: {
          ...item_value_searched.error,
          scope
        }
      }
    }

    const item_value = item_value_searched.data

    item_value.markAsProcessed()

    const {
      id: _,
      tag,
      transfer_method,
      ...data
    } = {
      ...item_value.properties,
      fk_id_tag: item_value.tag.id,
      fk_id_transfer_method: item_value.transfer_method.id
    }

    const result_update = this.repo_iv.update(item_value.id, data);

    if(!result_update.success){
      const scope = `MarkInstallmentItemValueAsProcessed(${this.repo_iv.update.name}) > ${result_update.error.scope}`
      return {
        success: false,
        error: {
          ...result_update.error,
          scope
        }
      }
    }

    const result_search_after_update = this.repo_i.find_by_id(input.id);

    if(!result_search_after_update.success){
      const scope = `MarkInstallmentItemValueAsProcessed(${this.repo_i.find_by_id.name}) > ${result_search_after_update.error.scope}`
      return {
        success: false,
        error: {
          ...result_search_after_update.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_search_after_update.data
    }
  }
}