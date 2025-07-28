import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { TypeOfVariants } from "../../types/variants_items";

interface Input {
  id: number
}

type UseCaseInterface = IUseCase<Input, boolean>

export default abstract class DeleteInstallment implements UseCaseInterface {
  protected abstract variant: TypeOfVariants

  constructor(private repo_i: IRepoInstallment) { }
  
  async execute(input: Input): ReturnType<UseCaseInterface["execute"]> {
    const result_deleted = this.repo_i.delete(input.id)
    if (!result_deleted.success) {
      const scope = `DeleteInstallment(${this.repo_i.delete.name}) > ${result_deleted.error.scope}`
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