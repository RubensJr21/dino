import { MBaseItemValue } from "./base_item_value.model";
import { MCreditCard } from "./credit_card.model";

export interface MBaseItemValue_CreditCard<T extends MBaseItemValue> {
  readonly id: number;
  fk_id_base_item_value: T["fk_id_base_item_value"];
  fk_id_credit_card: MCreditCard["id"];
}