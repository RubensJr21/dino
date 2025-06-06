import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { CreditCardNicknameIsAlreadyInUse, CreditCardUnknownError, isCreditCardNotFoundByNickname } from "@src/core/shared/errors/credit_card";
import { IRepoCreditCard } from "@src/infrastructure/repositories/drizzle/credit_card.repository";

type CreditCard_RegisterInput = StrictOmit<CreditCard, "is_disabled"|"created_at"|"updated_at">

export default class RegisterCreditCard implements IUseCase<CreditCard_RegisterInput, CreditCard>{
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
  async execute(input: CreditCard_RegisterInput): Promise<CreditCard> {
    try {
      const credit_card = this.repo_cc.findByNickname(input.nickname)
      throw new CreditCardNicknameIsAlreadyInUse(input.nickname)
    } catch (error) {
      if(!isCreditCardNotFoundByNickname(error)){
        throw error
      }
    }
    
    try {
      const credit_card_created = this.repo_cc.create({
        ...input,
        is_disabled: false
      })
      
      return new CreditCard(credit_card_created);
    } catch (error) {
      throw new CreditCardUnknownError()
    }
  }
}