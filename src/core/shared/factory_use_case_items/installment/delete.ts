import IUseCase from "@core/shared/IUseCase";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { IRepoItemValue } from "../../interfaces/IRepoItemValue";
import { Result } from "../../types/Result";
import { TypeOfVariants } from "../../types/variants_items";

interface DeleteInstallment_Input {
  id: number
}

type Return = Result<boolean>

export default abstract class UseCase_Installment_Delete implements IUseCase<DeleteInstallment_Input, Return> {
  protected abstract variant: TypeOfVariants
  constructor(
    private repo_biv: IRepoItemValue,
    private repo_iiv: IRepoInstallment
  ) { }
  async execute(input: DeleteInstallment_Input): Promise<Return> {
    const result = this.repo_iiv.delete(input.id)
    if (!result.success) {
      return {
        success: false,
        error: result.error
      }
    }
    const some_not_remove = !result.data.map(item_value_id => {
      return this.repo_biv.delete(item_value_id)
    }).some(deleted => deleted)

    if (some_not_remove) {
      return {
        success: false,
        error: "Algum item_value não foi removido."
      }
    }

    return {
      success: true,
      data: some_not_remove
    }
  }
}