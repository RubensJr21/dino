/* eslint-disable jsdoc/require-jsdoc */
import IEntityBase from "../shared/IEntityBase";
import { BankAccountTransferMethod } from "./bank_account_transfer_method.entity";
import { IItemValue } from "./item_value.entity";

export interface IItemValue_BankAccountTransferMethod<T extends IItemValue> extends IEntityBase {
  item_value: T;
  bank_account_transfer_method: BankAccountTransferMethod;
}

export class ItemValue_BankAccountTransferMethod<T extends IItemValue> implements IItemValue_BankAccountTransferMethod<T> {
  private readonly _id: IItemValue_BankAccountTransferMethod<T>["id"]
  private readonly _item_value: IItemValue_BankAccountTransferMethod<T>["item_value"]
  private readonly _bank_account_transfer_method: IItemValue_BankAccountTransferMethod<T>["bank_account_transfer_method"]

  constructor({
    id,
    item_value,
    bank_account_transfer_method,
  }: IItemValue_BankAccountTransferMethod<T>){
    this._id = id;
    this._item_value = item_value;
    this._bank_account_transfer_method = bank_account_transfer_method;
  }

  public get id(): ItemValue_BankAccountTransferMethod<T>["_id"] {
    return this._id;
  }
  public get item_value(): ItemValue_BankAccountTransferMethod<T>["_item_value"] {
    return this._item_value;
  }
  public get bank_account_transfer_method(): ItemValue_BankAccountTransferMethod<T>["_bank_account_transfer_method"] {
    return this._bank_account_transfer_method;
  }
}