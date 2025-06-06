import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@src/infrastructure/repositories/drizzle/credit_card.repository";

export default class ListAllCreditCards implements IUseCase<void, CreditCard[]>{
  /**
   * @param {IRepoCreditCard} repo_cc Interface do repositório de CreditCard
   */
  constructor(
    private repo_cc: IRepoCreditCard
  ){}
  /**
   * @returns {Promise<CreditCard[]>} retorna uma promise com uma lista de objetos que representam a entidade CreditCard
   */
  async execute(): Promise<CreditCard[]> {
    return this.repo_cc.findAll();
  }
}