import IUseCase from "@core/shared/IUseCase_v2";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { CreateRecurringParams, IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { RepoInterfaceNames } from "../../types/RepoInterfaceNames";
import { UnionRepoInterfaces } from "../../types/UnionRepoInterfaces";
import { UnionRepoInterfacesNames } from "../../types/UnionRepoInterfacesNames";
import { UseCaseResult } from "../../types/UseCaseResult";
import { TypeOfVariants } from "../../types/variants_items";

type Input = CreateRecurringParams

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
    console.log("Vou tentar criar")
    const result_created = this.repo_r.create(input)
    console.log("criado...")

    if(!result_created.success) {
      return {
        success: false,
        error: {
          ...result_created.error,
          trace: "RegisterRecurring > RepoRecurring"
        }
      }
    }

    const result_item_value_created = this.repo_iv.create({
      description: "",
      cashflow_type: this.variant,
      scheduled_at: input.start_date,
      amount: input.current_amount,
      was_processed: false,
      fk_id_tag: input.fk_id_tag,
      fk_id_transfer_method: input.fk_id_transfer_method
    })

    if(!result_item_value_created.success){
      return {
        success: false,
        error: {
          ...result_item_value_created.error,
          trace: "RegisterRecurring > RepoItemValue",
        }
      }
    }
    
    const recurring = result_created.data

    const item_value = result_item_value_created.data

    const recurring_item_value_linked = this.repo_r.register_next_recurring(recurring.id, item_value.id)

    if(!recurring_item_value_linked.success){
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