import IUseCase from "@core/shared/IUseCase";
import { Recurring } from "@src/core/entities/recurring.entity";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { CreateRecurringParams, IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

type Input = CreateRecurringParams

type UseCaseInterface = IUseCase<Input, Recurring>

export default abstract class RegisterRecurring implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(private repo_r: IRepoRecurring, private repo_iv: IRepoItemValue) { }

  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_created = this.repo_r.create(input)

    if(!result_created.success) {
      const scope = `RegisterRecurring(${this.repo_r.create.name}) > ${result_created.error.scope}`
      return {
        success: false,
        error: {
          ...result_created.error,
          scope
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
      const scope = `RegisterRecurring(${this.repo_iv.create.name}) > ${result_item_value_created.error.scope}`
      return {
        success: false,
        error: {
          ...result_item_value_created.error,
          scope
        }
      }
    }
    
    const recurring = result_created.data

    const item_value = result_item_value_created.data

    const recurring_item_value_linked = this.repo_r.registerNextRecurring(recurring.id, item_value.id)

    if(!recurring_item_value_linked.success){
      const scope = `RegisterRecurring(${this.repo_r.registerNextRecurring.name}) > ${recurring_item_value_linked.error.scope}`
      return {
        success: false,
        error: {
          ...recurring_item_value_linked.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: recurring
    }
  }
}