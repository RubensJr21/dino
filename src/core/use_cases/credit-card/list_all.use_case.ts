import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@core/shared/RepositoryTypes";

export default class ListAllCreditCards implements IUseCase<void, CreditCard[]>{
    constructor(
        private repo_cc: IRepoCreditCard
    ){}
    async execute(): Promise<CreditCard[]> {
        return await this.repo_cc.findAll()
    }
}