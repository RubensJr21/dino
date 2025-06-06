/* eslint-disable jsdoc/require-jsdoc */
import { IEntityWithDates } from "../shared/IEntityWithDates";
import { BankAccount } from "./bank_account.entity";

export interface IBankAccountTransferMethod extends IEntityWithDates {
  type: string;
  is_enable: boolean,
  readonly bank_account: BankAccount;
}

interface ReturnProperties extends StrictOmit<IBankAccountTransferMethod, "bank_account"> {
  bank_account: BankAccount["properties"]
}

export class BankAccountTransferMethod implements IBankAccountTransferMethod {
  private readonly _id: IBankAccountTransferMethod["id"];
  private _type: IBankAccountTransferMethod["type"];
  private _is_enable: boolean;
  private readonly _bank_account: IBankAccountTransferMethod["bank_account"];
  private readonly _created_at: IBankAccountTransferMethod["created_at"];
  private readonly _updated_at: IBankAccountTransferMethod["updated_at"];
  
  constructor({
    id,
    type,
    is_enable,
    bank_account,
    created_at,
    updated_at,
  }: IBankAccountTransferMethod){
    this._id = id;
    this._type = type;
    this._is_enable = is_enable;
    this._bank_account = bank_account;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  public get id(): BankAccountTransferMethod["_id"]{
    return this._id;
  }

  public get type(): BankAccountTransferMethod["_type"]{
    return this._type;
  }

  public get is_enable(): BankAccountTransferMethod["_is_enable"]{
    return this._is_enable;
  }

  public get bank_account(): BankAccountTransferMethod["_bank_account"]{
    return this._bank_account;
  }

  public get created_at(): BankAccountTransferMethod["_created_at"]{
    return this._created_at;
  }

  public get updated_at(): BankAccountTransferMethod["_updated_at"]{
    return this._updated_at;
  }

  public get properties(): ReturnProperties {
    return {
      id: this._id,
      type: this._type,
      is_enable: this._is_enable,
      bank_account: this._bank_account["properties"],
      created_at: this._created_at,
      updated_at: this._updated_at,
    } as const
  }
}