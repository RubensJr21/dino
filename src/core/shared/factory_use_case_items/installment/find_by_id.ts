import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { Result } from "../../types/Result";
import { TypeOfVariants } from "../../types/variants_items";

interface FindInstallmentById_Input {
  id: number
}

type Return = Result<Installment>

export default abstract class UseCase_Installment_FindById implements IUseCase<FindInstallmentById_Input, Return> {
  protected abstract variant: TypeOfVariants
  
  constructor(
    private repo_iiv: IRepoInstallment
  ){}
  
  async execute(input: FindInstallmentById_Input): Promise<Return> {
    return this.repo_iiv.findById(input.id)
  }
}