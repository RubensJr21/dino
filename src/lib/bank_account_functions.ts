export interface BankFormData {
  nickname: string;
  balance?: string;
  transfer_methods_enable: Array<string>
}

export const validateBankAccountData = (data: BankFormData): [hasError: boolean, errors: Array<string>] => {
  const errors = new Array<string>()
  let hasError = false
  if (data.nickname.length === 0) {
    errors.push("> O apelido da conta não pode ser vazio!")
    hasError = true
  }
  if (data.balance !== undefined && !(Number(data.balance.replace(/\D/, "")) >= 0)) {
    errors.push("> Valor atual em conta é inválido!")
    hasError = true
  }
  if (data.transfer_methods_enable.length === 0) {
    errors.push("> Você precisa escolher pelo menos 1 método de transferência para criar a conta bancária!")
    hasError = true
  }
  return [hasError, errors]
}