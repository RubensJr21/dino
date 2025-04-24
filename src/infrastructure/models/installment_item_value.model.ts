import { MBaseItemValue } from "./base_item_value.model";

export interface MInstallmentItemValue extends MBaseItemValue {
  id: number;
  installments_number: number;
}