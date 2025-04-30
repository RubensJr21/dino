import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@src/infrastructure/repositories/drizzle/bank_account.repository";

interface EnableBankAccount_Input {
  id: number,
}

export default class EnableBankAccount implements IUseCase<EnableBankAccount_Input, BankAccount> {
  constructor(
    private repo_ba: IRepoBankAccount
  ){}
  async execute(input: EnableBankAccount_Input): Promise<BankAccount> {
    const bank_account_model = await this.repo_ba.findById(input.id)

    if (!bank_account_model){
      throw new Error("Invalid id bank account!")
    }

    const bank_account = new BankAccount(bank_account_model);
    
    bank_account.enabled()

    const {id, ...bank_account_without_id} = bank_account.properties

    const bank_account_updated = await this.repo_ba.update(id, bank_account_without_id)

    if(!bank_account_updated) throw new Error("An error occurred while updating the bank account.")

    return bank_account;
  }
}