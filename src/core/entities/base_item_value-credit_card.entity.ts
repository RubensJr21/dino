import { ABaseItemValue } from "./base_item_value.entity";
import { CreditCard } from "./credit_card.entity";

export interface IBaseItemValue_CreditCard<T extends ABaseItemValue> {
  readonly id: number;
  base_item_value: T;
  credit_card: CreditCard
}

export class BaseItemValue_BankAccountTransferMethod<T extends ABaseItemValue> implements IBaseItemValue_CreditCard<T> {
  private readonly _id: IBaseItemValue_CreditCard<T>["id"]
  private readonly _base_item_value: IBaseItemValue_CreditCard<T>["base_item_value"]
  private readonly _credit_card: IBaseItemValue_CreditCard<T>["credit_card"]

  constructor({
    id,
    base_item_value,
    credit_card,
  }: IBaseItemValue_CreditCard<T>){
    this._id = id;
    this._base_item_value = base_item_value;
    this._credit_card = credit_card;
  }

  public get id(): BaseItemValue_BankAccountTransferMethod<T>["_id"] {
    return this._id;
  }
  public get base_item_value(): BaseItemValue_BankAccountTransferMethod<T>["_base_item_value"] {
    return this._base_item_value;
  }
  public get credit_card(): BaseItemValue_BankAccountTransferMethod<T>["_credit_card"] {
    return this._credit_card;
  }
}