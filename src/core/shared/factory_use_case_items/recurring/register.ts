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

    // ALERT: Fazer o Link do recurring com item_value

    return {
      success: true,
      data: result_created.data
    }
  }
}