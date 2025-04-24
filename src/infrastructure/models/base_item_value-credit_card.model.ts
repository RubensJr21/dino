import { CreditCard } from "@src/core/entities/credit_card.entity";
import { MBaseItemValue } from "./base_item_value.model";

export interface MBaseItemValue_CreditCard<T extends MBaseItemValue> {
  readonly id: number;
  base_item_value_id: T["biv_id"];
  credit_card_id: CreditCard["id"];
}