import CreditCardUseCases from "@src/core/facades/credit-card.use_cases";
import CreditCardDrizzleRepository from "@src/infrastructure/repositories/drizzle/credit_card.repository";

const CreditCardApi = new CreditCardUseCases(
  new CreditCardDrizzleRepository()
);

export default CreditCardApi;