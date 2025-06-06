import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@infrastructure/repositories/drizzle/credit_card.repository";
import { CreditCardNicknameIsAlreadyInUse, CreditCardUnknownError, isCreditCardNotFoundById, isCreditCardNotFoundByNickname } from "@src/core/shared/errors/credit_card";

interface UpdateNicknameCreditCard_Input {
  id: number,
  new_nickname: string
}

export default class UpdateNicknameCreditCard implements IUseCase<UpdateNicknameCreditCard_Input, CreditCard>{
  /**
   * @param {IRepoCreditCard} repo_cc Interface do repositório de CreditCard
   */
  constructor(
    private repo_cc: IRepoCreditCard
  ){}
  /**
   * @param {UpdateNicknameCreditCard_Input} input objeto contém o id e o novo valor para o atributo 'nickname' de CreditCard
   * @throws {CreditCardNicknameIsAlreadyInUse}
   * @throws {CreditCardNotFoundById}
   * @throws {CreditCardUnknownError}
   * @returns {Promise<CreditCard>} retorna uma promise com um objeto que representa a entidade CreditCard
   */
  async execute(input: UpdateNicknameCreditCard_Input): Promise<CreditCard> {
    try {
      const bank_account = this.repo_cc.findByNickname(input.new_nickname)
      throw new CreditCardNicknameIsAlreadyInUse(input.new_nickname)
    } catch (error) {
      if(!isCreditCardNotFoundByNickname(error)){
        throw error
      }
    }
    try {  
      const credit_card = this.repo_cc.findById(input.id)
  
      credit_card.change_nickname(input.new_nickname)
      const {id, created_at, updated_at, ...credit_card_without_id} = credit_card.properties
  
      return this.repo_cc.update(id, credit_card_without_id);
    } catch (error) {
      if(isCreditCardNotFoundById(error)){
        throw error
      }
      throw new CreditCardUnknownError()
    }
  }
}