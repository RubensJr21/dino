import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { isCreditCardNotFoundById } from "@src/core/shared/errors/credit_card";
import { IRepoCreditCard } from "@src/infrastructure/repositories/drizzle/credit_card.repository";

interface UpdateLimitCreditCard_Input {
  id: number,
  new_limit: number
}

export default class UpdateLimitCreditCard implements IUseCase<UpdateLimitCreditCard_Input, CreditCard>{
  /**
   * @param {IRepoCreditCard} repo_cc Interface do repositório de CreditCard
   */
  constructor(
    private repo_cc: IRepoCreditCard
  ){}
  /**
   * @param {UpdateLimitCreditCard_Input} input objeto contém o id e o novo valor para o atributo 'new_limit' de CreditCard
   * @throws {CreditCardNotFoundById}
   * @throws {CreditCardUnknownError}
   * @returns {Promise<CreditCard>} retorna uma promise com um objeto que representa a entidade CreditCard
   */
  async execute(input: UpdateLimitCreditCard_Input): Promise<CreditCard> {
    try{
      const credit_card = this.repo_cc.findById(input.id)
  
      credit_card.change_limit(input.new_limit)
  
      const {id, created_at, updated_at, ...credit_card_without_id} = credit_card.properties  
      return this.repo_cc.update(id, credit_card_without_id)
    } catch (error){
      if(isCreditCardNotFoundById(error)){
        throw error
      }
      throw error
    }
  }
}