import IUseCase from "@core/shared/IUseCase_v2";
import { IItemValue } from "@src/core/entities/item_value.entity";
import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { Tag } from "@src/core/entities/tag.entity";
import { TransferMethod } from "@src/core/entities/transfer_method.entity";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  description: IItemValue["description"]
  is_disabled: boolean;
  start_date: Date;
  end_date?: Date;
  current_amount: number;
  tag: Tag;
  transfer_method: TransferMethod;
  recurrence_type: RecurrenceType;
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
  "RegisterRecurring",
  Recurring,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class RegisterRecurring implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(private repo_r: IRepoRecurring, private repo_iv: IRepoItemValue) { }

  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_created = this.repo_r.create(input)

    if (!result_created.success) {
      return {
        success: false,
        error: {
          ...result_created.error,
          trace: "RegisterRecurring > RepoRecurring"
        }
      }
    }

    const recurring = result_created.data

    const data_iv = {
      description: input.description,
      cashflow_type: this.variant,
      scheduled_at: recurring.start_date,
      amount: recurring.current_amount,
      was_processed: false,
      tag: recurring.tag,
      transfer_method: recurring.transfer_method
    }

    const result_item_value_created = this.repo_iv.create(data_iv)

    if (!result_item_value_created.success) {
      return {
        success: false,
        error: {
          ...result_item_value_created.error,
          trace: "RegisterRecurring > RepoItemValue",
        }
      }
    }

    const item_value = result_item_value_created.data

    const recurring_item_value_linked = this.repo_r.register_next_recurring(recurring.id, item_value.id)

    if (!recurring_item_value_linked.success) {
      return {
        success: false,
        error: {
          ...recurring_item_value_linked.error,
          trace: "RegisterRecurring > RepoRecurring"
        }
      }
    }

    return {
      success: true,
      data: recurring
    }
  }
}