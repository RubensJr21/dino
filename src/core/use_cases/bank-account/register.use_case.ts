import { BankAccount, IBankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@src/infrastructure/repositories/drizzle/bank_account.repository";

type BankAccount_RegisterInput = Pick<IBankAccount, "nickname"|"balance">

export default class RegisterBankAccount implements IUseCase<BankAccount_RegisterInput, BankAccount> {
  constructor(
    private repo_ba: IRepoBankAccount
  ){}
  async execute(input: BankAccount_RegisterInput): Promise<BankAccount> {
    // REVIEW: Quando um banco é adicionado é necessário popular a tabela de bank_account_transfer_method

    const nickname = await this.repo_ba.findByNickname(input.nickname)
    if(nickname){
      throw new Error("Nickname already used by another bank account!")
    }

    const current_date = new Date()

    const bank_account_data = {
      ...input,
      is_disabled: false,
      created_at: current_date,
      updated_at: current_date
    }

    const bank_account_created = await this.repo_ba.create(bank_account_data)

    if(!bank_account_created) {
      throw new Error("An error occurred while creating the bank account.")
    }
    
    return new BankAccount(bank_account_created);
  }
}