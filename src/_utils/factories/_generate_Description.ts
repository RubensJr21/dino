import { faker } from "@utils/factories/_faker";

export function generatePaymentDescription(): string {
  const categories = [
    () => `Pagamento ${faker.finance.transactionType()}`,
    () => `Compra em ${faker.company.name()}`,
    () => `Assinatura ${faker.commerce.department()}`,
    () => `Conta de ${faker.word.words(2)}`,
    () => `Serviço de ${faker.word.words(2)}`,
    () => `Compra de ${faker.commerce.product()}`
  ]

  return faker.helpers.arrayElement(categories)()
}