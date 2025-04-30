import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@infrastructure/repositories/drizzle/credit_card.repository";

interface UpdateNicknameCreditCard_Input {
  id: number,
  new_nickname: string
}

export default class UpdateNicknameCreditCard implements IUseCase<UpdateNicknameCreditCard_Input, CreditCard>{
  constructor(
    private repo_cc: IRepoCreditCard
  ){}
  async execute(input: UpdateNicknameCreditCard_Input): Promise<CreditCard> {
    const nickname = await this.repo_cc.findByNickname(input.new_nickname)
    if(nickname){
      throw new Error("Nickname already used by another credit card!")
    }

    const credit_card_model = await this.repo_cc.findById(input.id)
    if (!credit_card_model){
      throw new Error("Invalid id credit card")
    }

    const credit_card = new CreditCard(credit_card_model)
    credit_card.change_nickname(input.new_nickname)
    const {id, ...credit_card_without_id} = credit_card.properties

    const credit_card_updated = await this.repo_cc.update(id, credit_card_without_id)
    if(!credit_card_updated) {
      throw new Error("An error occurred while updating the credit card.")
    }
    return credit_card;
  }
}