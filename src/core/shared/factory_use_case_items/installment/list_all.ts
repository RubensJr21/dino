import IUseCase from "@core/shared/IUseCase";
import { Installment } from "@src/core/entities/installment.entity";
import { IRepoInstallment } from "../../interfaces/IRepositoryInstallment";
import { TypeOfVariants, Variants_Of_ItemValue } from "../../types/variants_items";

export default abstract class UseCase_Installment_ListAll implements IUseCase<void, Installment[]> {
  protected abstract variant: TypeOfVariants
  /**
   * @param {IRepoInstallment} repo_iiv - The repository for retrieving installments
   */
  constructor(
    private repo_iiv: IRepoInstallment
  ){}
  /**
   * @returns {Promise<Installment[]>} Promise de uma lista de Installment
   */
  async execute(): Promise<Installment[]> {
    return this.repo_iiv.findAllByCashflowType(Variants_Of_ItemValue[this.variant])
  }
}