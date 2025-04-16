import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@core/shared/RepositoryTypes";

interface DisableBankAccount_Input {
    id: number,
}

export default class DisableBankAccount implements IUseCase<DisableBankAccount_Input, BankAccount> {
    constructor(
        private repo_ba: IRepoBankAccount
    ){}
    async execute(input: DisableBankAccount_Input): Promise<BankAccount> {
        const bank_account = await this.repo_ba.findById(input.id)

        if (!bank_account){
            throw new Error("Invalid id bank account!")
        }
        
        if (bank_account.is_disabled === true){
            throw new Error("Bank account is already disable!")
        }

        const bank_account_updated = await this.repo_ba.update({
            ...bank_account,
            is_disabled: true
        })

        if(!bank_account_updated) throw new Error("Invalid Bank Account returned!")

        return bank_account_updated;
    }
}