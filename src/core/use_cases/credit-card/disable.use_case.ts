import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { CreditCardNotFoundById, CreditCardUnknownError, isCreditCardNotFoundById } from "@src/core/shared/errors/credit_card";
import { IRepoCreditCard } from "@src/infrastructure/repositories/drizzle/credit_card.repository";

interface DisableCreditCard_Input {
  id: number
}

export default class DisableCreditCard implements IUseCase<DisableCreditCard_Input, CreditCard>{
  /**
   * @param {IRepoCreditCard} repo_cc Interface do repositório de CreditCard
   */
  constructor(
    private repo_cc: IRepoCreditCard
  ){}
  /**
   * @param {DisableCreditCard_Input} input objeto contém o id da CreditCard a ser desabilitado
   * @throws {CreditCardNotFoundById}
   * @throws {CreditCardUnknownError}
   * @returns {Promise<CreditCard>} retorna uma promise com um objeto que representa a entidade CreditCard
   */
  async execute(input: DisableCreditCard_Input): Promise<CreditCard> {
    try {
      const credit_card = this.repo_cc.findById(input.id)

      credit_card.disable()
      
      const {id, created_at, updated_at, ...credit_card_without_id} = credit_card.properties
      return this.repo_cc.update(id, credit_card_without_id)
    } catch (error){
      if(isCreditCardNotFoundById(error)){
        throw new CreditCardNotFoundById(input.id)
      }
      throw new CreditCardUnknownError()
    }
  }
}