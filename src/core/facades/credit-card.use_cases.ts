import { IRepoCreditCard } from "@src/infrastructure/repositories/drizzle/credit_card.repository";
import DisableCreditCard from "../use_cases/credit-card/disable.use_case";
import EnableCreditCard from "../use_cases/credit-card/enable.use_case";
import ListAllCreditCards from "../use_cases/credit-card/list_all.use_case";
import RegisterCreditCard from "../use_cases/credit-card/register.use_case";
import UpdateLimitCreditCard from "../use_cases/credit-card/update_limit.use_case";
import UpdateNicknameCreditCard from "../use_cases/credit-card/update_nickname.use_case";

/*
  Aqui está sendo utilizado o design pattern FACADE
  
  links úteis:
  https://refactoring.guru/pt-br/design-patterns/facade
  https://refactoring.guru/pt-br/design-patterns/facade/typescript/example
*/

export default class CreditCardUseCases {
  public readonly register: RegisterCreditCard;
  public readonly disable: DisableCreditCard;
  public readonly enable:  EnableCreditCard;
  public readonly list_all: ListAllCreditCards;
  public readonly update_limit: UpdateLimitCreditCard;
  public readonly update_nickname: UpdateNicknameCreditCard;

  /**
   * Initializes use cases for bank account operations with the provided repository.
   * @param {IRepoCreditCard} repo - The repository used for bank account data access and manipulation
   */
  constructor(repo: IRepoCreditCard){
    this.register = new RegisterCreditCard(repo);
    this.disable = new DisableCreditCard(repo);
    this.enable = new EnableCreditCard(repo);
    this.list_all = new ListAllCreditCards(repo);
    this.update_limit = new UpdateLimitCreditCard(repo);
    this.update_nickname = new UpdateNicknameCreditCard(repo);
  }
}