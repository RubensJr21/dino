import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@src/infrastructure/repositories/drizzle/credit_card.repository";

export default class ListAllCreditCards implements IUseCase<void, CreditCard[]>{
  constructor(
    private repo_cc: IRepoCreditCard
  ){}
  async execute(): Promise<CreditCard[]> {
    const credit_cards_models = await this.repo_cc.findAll()
    const credit_cards = credit_cards_models.map(cc_ac => new CreditCard(cc_ac))
    return credit_cards;
  }
}