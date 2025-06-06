/* eslint-disable jsdoc/require-jsdoc */
import IEntityBase from "../shared/IEntityBase";
import { BaseItemValue, IBaseItemValue } from "./base_item_value.entity";
import { CreditCard } from "./credit_card.entity";

export interface IBaseItemValue_CreditCard<T extends IBaseItemValue> extends IEntityBase{
  readonly id: number;
  base_item_value_instance: T;
  credit_card: CreditCard
}

export class BaseItemValue_CreditCard<T extends BaseItemValue> implements IBaseItemValue_CreditCard<T> {
  private readonly _id: IBaseItemValue_CreditCard<T>["id"]
  private readonly _base_item_value_instance: IBaseItemValue_CreditCard<T>["base_item_value_instance"]
  private readonly _credit_card: IBaseItemValue_CreditCard<T>["credit_card"]

  constructor({
    id,
    base_item_value_instance,
    credit_card,
  }: IBaseItemValue_CreditCard<T>){
    this._id = id;
    this._base_item_value_instance = base_item_value_instance;
    this._credit_card = credit_card;
  }

  public get id(): BaseItemValue_CreditCard<T>["_id"] {
    return this._id;
  }

  public get base_item_value_instance(): BaseItemValue_CreditCard<T>["_base_item_value_instance"] {
    return this._base_item_value_instance;
  }
  
  public get credit_card(): BaseItemValue_CreditCard<T>["_credit_card"] {
    return this._credit_card;
  }
}