import { MCreditCard } from "./credit_card.model";
import { MItemValue } from "./item_value.model";

export interface MItemValue_CreditCard<T extends MItemValue> {
  fk_id_item_value: T["id"];
  fk_id_credit_card: MCreditCard["id"];
}