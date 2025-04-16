import { CreditCard } from "@core/entities/credit_card.entity";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@core/shared/RepositoryTypes";

interface UpdateNicknameCreditCard_Input {
    id: number,
    new_nickname: string
}

export default class UpdateNicknameCreditCard implements IUseCase<UpdateNicknameCreditCard_Input, CreditCard>{
    constructor(
        private repo_cc: IRepoCreditCard
    ){}
    async execute(input: UpdateNicknameCreditCard_Input): Promise<CreditCard> {
        const cc_nickname = await this.repo_cc.findByNickname(input.new_nickname)
        if(cc_nickname){
            throw new Error("Nickname already used by another credit card!")
        }

        const credit_card = await this.repo_cc.findById(input.id)

        if (!credit_card){
            throw new Error("Invalid id credit card")
        }

        const credit_card_updated = await this.repo_cc.update({
            ...credit_card,
            nickname: input.new_nickname
        })

        if(!credit_card_updated) throw new Error("Invalid Credit Card returned!")

        return credit_card_updated
    }

}