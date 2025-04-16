import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@core/shared/RepositoryTypes";

interface UpdateBalanceBankAccount_Input {
    id: number,
    new_balance: number
}

export default class UpdateBalanceBankAccount implements IUseCase<UpdateBalanceBankAccount_Input, BankAccount> {
    constructor(
        private repo_ba: IRepoBankAccount
    ){}
    async execute(input: UpdateBalanceBankAccount_Input): Promise<BankAccount> {
        const bank_account = await this.repo_ba.findById(input.id)

        if (!bank_account){
            throw new Error("Invalid id bank account")
        }

        const bank_account_updated = await this.repo_ba.update({
            ...bank_account,
            balance: input.new_balance
        })

        if(!bank_account_updated) throw new Error("Invalid Bank Account returned!")

        return bank_account_updated;
    }

}