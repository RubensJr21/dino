import IUseCase from "@core/shared/IUseCase";
import { IRecurring } from "@src/core/entities/recurring.entity";
import { IRepoRecurring } from "../../interfaces/IRepoRecurring";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: IRecurring["id"]
}

type UseCaseInterface = IUseCase<Input, boolean>

export default abstract class DeleteRecurring implements UseCaseInterface {
  protected abstract variant: TypeOfVariants;

  constructor(
    private repo_r: IRepoRecurring
  ){}

  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_deleted = this.repo_r.delete(input.id)

    if (!result_deleted.success) {
      const scope = `DeleteRecurring(${this.repo_r.delete.name}) > ${result_deleted.error.scope}`
      return {
        success: false,
        error: {
          ...result_deleted.error,
          scope
        }
      }
    }

    return {
      success: true,
      data: result_deleted.data
    }
  }
}