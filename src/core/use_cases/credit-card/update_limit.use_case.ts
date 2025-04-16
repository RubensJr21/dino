import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@core/shared/RepositoryTypes";

interface UpdateLimitCreditCard_Input {
    id: number,
    new_limit: number
}

export default class UpdateLimitCreditCard implements IUseCase<UpdateLimitCreditCard_Input, CreditCard>{
    constructor(
        private repo_cc: IRepoCreditCard
    ){}
    async execute(input: UpdateLimitCreditCard_Input): Promise<CreditCard> {
        const credit_card = await this.repo_cc.findById(input.id)

        if (!credit_card){
            throw new Error("Invalid id credit card")
        }

        const credit_card_updated = await this.repo_cc.update({
            ...credit_card,
            limit: input.new_limit
        })

        if(!credit_card_updated) throw new Error("Invalid Credit Card returned!")

        return credit_card_updated
    }

}