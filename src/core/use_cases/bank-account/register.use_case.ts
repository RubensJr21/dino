import { BankAccount } from "@core/entities/bank_account.entity";
import { DTO_BankAccount } from "@core/shared/DTOTypes";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@core/shared/RepositoryTypes";

type BankAccount_RegisterInput = StrictOmit<DTO_BankAccount, "is_disabled">

export default class RegisterBankAccount implements IUseCase<BankAccount_RegisterInput, BankAccount> {
    constructor(
        private repo_ba: IRepoBankAccount
    ){}
    async execute(input: BankAccount_RegisterInput): Promise<BankAccount> {
        // REVIEW: Quando um banco é adicionado é necessário popular a tabela de bank_account_transfer_method

        const ba_nickname = await this.repo_ba.findByNickname(input.nickname)
        if(ba_nickname){
            throw new Error("Nickname already used by another bank account!")
        }

        const bank_account = await this.repo_ba.create({
            ...input,
            is_disabled: false
        })

        if(!bank_account) throw new Error("Invalid Bank Account returned!")

        return bank_account;
    }

}