import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { Result } from "../../types/Result";
import { TypeOfVariants } from "../../types/variants_items";

type Return = Result<Installment[]>

export default abstract class UseCase_Installment_ListAll implements IUseCase<void, Return> {
  protected abstract variant: TypeOfVariants
  
  constructor(
    private repo_iiv: IRepoInstallment
  ){}
  
  async execute(): Promise<Return> {
    return this.repo_iiv.findAllByCashflowType(this.variant)
  }
}