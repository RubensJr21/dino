import { MBaseItemValue } from "./base_item_value.model";
import { MCreditCard } from "./credit_card.model";

export interface MBaseItemValue_CreditCard<T extends MBaseItemValue> {
  readonly id: number;
  base_item_value_id: T["biv_id"];
  credit_card_id: MCreditCard["id"];
}