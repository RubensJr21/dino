import { ABaseItemValue } from "./base_item_value.entity";
import { CreditCard } from "./credit_card.entity";

export interface IBaseItemValue_CreditCard<T extends ABaseItemValue> {
  readonly id: number;
  base_item_value: T;
  credit_card: CreditCard
}