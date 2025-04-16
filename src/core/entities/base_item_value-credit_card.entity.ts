import { BaseItemValue } from "./base_item_value.entity";
import { CreditCard } from "./credit_card.entity";

export interface BaseItemValue_CreditCard {
    readonly id: number;
    base_item_value: BaseItemValue;
    credit_card: CreditCard
}