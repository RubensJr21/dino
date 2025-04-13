import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@core/shared/RepositoryTypes";

interface UpdateNicknameBankAccount_Input {
    id: number,
    new_nickname: string
}

export default class UpdateNicknameBankAccount implements IUseCase<UpdateNicknameBankAccount_Input, BankAccount> {
    constructor(
        private repo_ba: IRepoBankAccount
    ){}
    async execute(input: UpdateNicknameBankAccount_Input): Promise<BankAccount> {
        const ba_nickname = await this.repo_ba.findByNickname(input.new_nickname)
        if(ba_nickname){
            throw new Error("Nickname already used by another bank account!")
        }

        const bank_account = await this.repo_ba.findById(input.id)

        if (!bank_account){
            throw new Error("Invalid id bank account")
        }

        const bank_account_updated = await this.repo_ba.update({
            ...bank_account,
            nickname: input.new_nickname
        })

        if(!bank_account_updated) throw new Error("Invalid Bank Account returned!")

        return bank_account_updated;
    }

}