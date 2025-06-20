/* eslint-disable jsdoc/require-jsdoc */
import IEntityBase from "../shared/IEntityBase";
import { CreditCard } from "./credit_card.entity";
import { IItemValue, ItemValue } from "./item_value.entity";

export interface IItemValue_CreditCard<T extends IItemValue> extends IEntityBase{
  readonly id: number;
  base_item_value_instance: T;
  credit_card: CreditCard
}

export class ItemValue_CreditCard<T extends ItemValue> implements IItemValue_CreditCard<T> {
  private readonly _id: IItemValue_CreditCard<T>["id"]
  private readonly _base_item_value_instance: IItemValue_CreditCard<T>["base_item_value_instance"]
  private readonly _credit_card: IItemValue_CreditCard<T>["credit_card"]

  constructor({
    id,
    base_item_value_instance,
    credit_card,
  }: IItemValue_CreditCard<T>){
    this._id = id;
    this._base_item_value_instance = base_item_value_instance;
    this._credit_card = credit_card;
  }

  public get id(): ItemValue_CreditCard<T>["_id"] {
    return this._id;
  }

  public get base_item_value_instance(): ItemValue_CreditCard<T>["_base_item_value_instance"] {
    return this._base_item_value_instance;
  }
  
  public get credit_card(): ItemValue_CreditCard<T>["_credit_card"] {
    return this._credit_card;
  }
}