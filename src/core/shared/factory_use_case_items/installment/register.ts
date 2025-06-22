import IUseCase from "@core/shared/IUseCase";
import { IInstallment, Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepositoryInstallment";
import { TypeOfVariants } from "../../types/variants_items";

type RegisterInstallmentInput = StrictOmit<IInstallment, "id"|"created_at"|"updated_at">

export default abstract class UseCase_Installment_Register implements IUseCase<RegisterInstallmentInput, Installment> {
  protected abstract variant: TypeOfVariants
  /**
   * Constructs an instance of the use case with the required installment repository
   * @param {IRepoInstallment} repo_i The repository for managing installment operations
   */
  constructor(
    private repo_i: IRepoInstallment,
  ){}
  /**
   * Executes the registration of an installment
   * @param {RegisterInstallmentInput} input The input data for creating an installment
   * @returns {Promise<Installment>} The created installment
   */
  async execute(input: RegisterInstallmentInput): Promise<Installment> {
    const {
      start_date,
      installments_number,
      total_amount,
      itens
    } = input
    
    return this.repo_i.create({
      start_date,
      installments_number,
      total_amount,
      itens
    })
  }
}