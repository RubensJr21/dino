/* eslint-disable jsdoc/require-jsdoc */
import IEntityBase from "../shared/IEntityBase";
import { BankAccountTransferMethod } from "./bank_account_transfer_method.entity";
import { IBaseItemValue } from "./base_item_value.entity";

export interface IBaseItemValue_BankAccountTransferMethod<T extends IBaseItemValue> extends IEntityBase {
  base_item_value: T;
  bank_account_transfer_method: BankAccountTransferMethod;
}

export class BaseItemValue_BankAccountTransferMethod<T extends IBaseItemValue> implements IBaseItemValue_BankAccountTransferMethod<T> {
  private readonly _id: IBaseItemValue_BankAccountTransferMethod<T>["id"]
  private readonly _base_item_value: IBaseItemValue_BankAccountTransferMethod<T>["base_item_value"]
  private readonly _bank_account_transfer_method: IBaseItemValue_BankAccountTransferMethod<T>["bank_account_transfer_method"]

  constructor({
    id,
    base_item_value,
    bank_account_transfer_method,
  }: IBaseItemValue_BankAccountTransferMethod<T>){
    this._id = id;
    this._base_item_value = base_item_value;
    this._bank_account_transfer_method = bank_account_transfer_method;
  }

  public get id(): BaseItemValue_BankAccountTransferMethod<T>["_id"] {
    return this._id;
  }
  public get base_item_value(): BaseItemValue_BankAccountTransferMethod<T>["_base_item_value"] {
    return this._base_item_value;
  }
  public get bank_account_transfer_method(): BaseItemValue_BankAccountTransferMethod<T>["_bank_account_transfer_method"] {
    return this._bank_account_transfer_method;
  }
}