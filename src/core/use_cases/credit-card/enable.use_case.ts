import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@core/shared/RepositoryTypes";

interface EnableCreditCard_Input {
    id: number
}

export default class EnableCreditCard implements IUseCase<EnableCreditCard_Input, CreditCard>{
    constructor(
        private repo_cc: IRepoCreditCard
    ){}
    async execute(input: EnableCreditCard_Input): Promise<CreditCard> {
        const credit_card = await this.repo_cc.findById(input.id)

        if (!credit_card){
            throw new Error("Invalid id credit card")
        }

        if (credit_card.is_disabled === false){
            throw new Error("Credit card is already enable!")
        }

        const credit_card_updated = await this.repo_cc.update({
            ...credit_card,
            is_disabled: false
        })

        if(!credit_card_updated) throw new Error("Invalid Credit Card returned!")

        return credit_card_updated
    }

}