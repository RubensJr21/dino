import { ABaseItemValue } from "./base_item_value.entity";
import { ICreditCard } from "./credit_card.entity";

export interface BaseItemValue_CreditCard {
  readonly id: number;
  base_item_value: ABaseItemValue;
  credit_card: ICreditCard
}