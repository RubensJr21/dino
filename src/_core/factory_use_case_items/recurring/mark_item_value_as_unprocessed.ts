import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { ItemValue } from "@domain/entities/item_value.entity";
import { Recurring } from "@domain/entities/recurring.entity";
import { IRepoItemValue } from "@domain/repositories/IRepoItemValue";
import { IRepoRecurring } from "@domain/repositories/IRepoRecurring";

interface Input {
  id: Recurring["id"];
  item_value_id: ItemValue["id"];
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoRecurring,
  IRepoItemValue,
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Recurring,
  RepoInterfaceNames.ItemValue
]>;

type Return = UseCaseResult<
  "MarkRecurringItemValueAsUnProcessed",
  Recurring,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class MarkRecurringItemValueAsUnProcessed implements UseCaseInterface {
  protected abstract variant: TypeOfVariants
  constructor(
    private repo_r: IRepoRecurring,
    private repo_iv: IRepoItemValue
  ) { }
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const item_value_searched = this.repo_r.find_item_value(input.id, input.item_value_id);

    if (!item_value_searched.success) {
      return {
        success: false,
        error: {
          ...item_value_searched.error,
          trace: "MarkRecurringItemValueAsUnProcessed > RepoRecurring"
        }
      }
    }

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

    const result_update = this.repo_iv.update(id, data);

    if(!result_update.success){
      return {
        success: false,
        error: {
          ...result_update.error,
          trace: "MarkRecurringItemValueAsUnProcessed > RepoItemValue"
        },
      }
    }

    const result_search_after_update = this.repo_r.find_by_id(input.id);

    if(!result_search_after_update.success){
      return {
        success: false,
        error: {
          ...result_search_after_update.error,
          trace: "MarkRecurringItemValueAsUnProcessed > RepoRecurring"
        }
      }
    }

    return {
      success: true,
      data: result_search_after_update.data
    };
  }
}