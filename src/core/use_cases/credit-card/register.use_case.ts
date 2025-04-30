import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@src/infrastructure/repositories/drizzle/credit_card.repository";

type CreditCard_RegisterInput = StrictOmit<CreditCard, "is_disabled"|"created_at"|"updated_at">

export default class RegisterCreditCard implements IUseCase<CreditCard_RegisterInput, CreditCard>{
  constructor(
    private repo_cc: IRepoCreditCard
  ){}
  async execute(input: CreditCard_RegisterInput): Promise<CreditCard> {
    const cc_nickname = await this.repo_cc.findByNickname(input.nickname)
    if(cc_nickname){
      throw new Error("Nickname already used by another credit card!")
    }

    const current_date = new Date()

    const credit_card_data = {
      ...input,
      is_disabled: false,
      created_at: current_date,
      updated_at: current_date
    }

    const credit_card_created = await this.repo_cc.create(credit_card_data)

    if(!credit_card_created) {
      throw new Error("An error occurred while creating the bank account.")
    }
    return new CreditCard(credit_card_created)
  }
}