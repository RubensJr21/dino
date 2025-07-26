import IUseCase from "@core/shared/IUseCase";
import { IInstallment, Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepoInstallment";
import { Result } from "../../types/Result";
import { TypeOfVariants } from "../../types/variants_items";

type RegisterInstallmentInput = StrictOmit<IInstallment, "id"|"created_at"|"updated_at">

type Return = Result<Installment>

export default abstract class UseCase_Installment_Register implements IUseCase<RegisterInstallmentInput, Return> {
  protected abstract variant: TypeOfVariants
  
  constructor(
    private repo_i: IRepoInstallment,
  ){}
  
  async execute(input: RegisterInstallmentInput): Promise<Return> {
    const {
      start_date,
      installments_number,
      total_amount,
    } = input
    
    return this.repo_i.create({
      start_date,
      installments_number,
      total_amount,
    })
  }
}