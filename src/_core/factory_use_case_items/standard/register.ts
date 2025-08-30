import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { UnionRepoInterfaces } from "@core-types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "@core-types/UnionRepoInterfacesNames";
import { UseCaseResult } from "@core-types/UseCaseResult";
import { TypeOfVariants } from "@core-types/variants_items";
import IUseCase from "@core/interfaces/IUseCase_v3";
import { IItemValue } from "@domain/entities/item_value.entity";
import { IStandard, Standard } from "@domain/entities/standard.entity";
import { Tag } from "@domain/entities/tag.entity";
import { TransferMethod } from "@domain/entities/transfer_method.entity";
import { IRepoItemValue } from "@domain/repositories/IRepoItemValue";
import { IRepoStandard } from "@domain/repositories/IRepoStandard";

type Input = {
  description: IStandard["description"]
  cashflow_type: TypeOfVariants;
  scheduled_at: IItemValue["scheduled_at"];
  amount: IItemValue["amount"];
  tag: Tag;
  transfer_method: TransferMethod;
}

type UsedRepoInterfaces = UnionRepoInterfaces<[
  IRepoStandard,
  IRepoItemValue
]>;

type UsedRepoInterfaceNames = UnionRepoInterfacesNames<[
  RepoInterfaceNames.Standard,
  RepoInterfaceNames.ItemValue
]>;

type Return = UseCaseResult<
  "RegisterStandard",
  Standard,
  UsedRepoInterfaces,
  UsedRepoInterfaceNames
>

type UseCaseInterface = IUseCase<Input, Return>

export default abstract class RegisterStandard implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;
  constructor(
    private repo_s: IRepoStandard,
    private repo_iv: IRepoItemValue
  ) { }
  execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const item_value_created = this.repo_iv.create({
      cashflow_type: input.cashflow_type,
      scheduled_at: input.scheduled_at,
      amount: input.amount,
      was_processed: false,
      tag: input.tag,
      transfer_method: input.transfer_method,
    })

    if (!item_value_created.success) {
      return {
        success: false,
        error: {
          ...item_value_created.error,
          trace: "RegisterStandard > RepoItemValue"
        }
      }
    }

    const item_value_created_data = item_value_created.data

    const result_create = this.repo_s.create({
      description: input.description,
      item_value_id: item_value_created_data.id
    })

    if (!result_create.success) {
      return {
        success: false,
        error: {
          ...result_create.error,
          trace: "RegisterStandard > RepoStandard"
        }
      }
    }

    return {
      success: true,
      data: result_create.data
    }
  }
}