import { BaseItemValue } from "./base_item_value.entity";

export interface InstallmentItemValue {
    readonly id: number;
    installments_number: number;
    base_item_value: BaseItemValue
}