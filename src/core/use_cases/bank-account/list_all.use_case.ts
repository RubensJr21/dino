import { BankAccount } from "@core/entities/bank_account.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoBankAccount } from "@core/shared/RepositoryTypes";

export default class ListAllBankAccounts implements IUseCase<void, BankAccount[]> {
    constructor(
        private repo_ba: IRepoBankAccount
    ){}
    async execute(): Promise<BankAccount[]> {
        return await this.repo_ba.findAll();
    }

}