import { CreditCard } from "@core/entities/credit_card.entity";
import { DTO_CreditCard } from "@core/shared/DTOTypes";
import IUseCase from "@core/shared/IUseCase";
import { IRepoCreditCard } from "@core/shared/RepositoryTypes";

type CreditCard_RegisterInput = StrictOmit<DTO_CreditCard, "is_disabled">

export default class RegisterCreditCard implements IUseCase<CreditCard_RegisterInput, CreditCard>{
    constructor(
        private repo_cc: IRepoCreditCard
    ){}
    async execute(input: CreditCard_RegisterInput): Promise<CreditCard> {
        const cc_nickname = await this.repo_cc.findByNickname(input.nickname)
        if(cc_nickname){
            throw new Error("Nickname already used by another credit card!")
        }

        const credit_card = await this.repo_cc.create({
            ...input,
            is_disabled: false
        })

        if(!credit_card) throw new Error("Invalid Credit Card returned!")

        return credit_card
    }

}