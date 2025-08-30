import { IEntityWithDates } from "./IEntityWithDates";
import { BankAccount } from "./bank_account.entity";
import { TransferMethod } from "./transfer_method.entity";

export interface IBankAccountTransferMethod extends IEntityWithDates {
  is_disabled: boolean;
  readonly bank_account: BankAccount;
  readonly transfer_method: TransferMethod;
}

interface ReturnProperties extends StrictOmit<IBankAccountTransferMethod, "bank_account"|"transfer_method"> {
  bank_account: BankAccount["properties"],
  transfer_method: TransferMethod["properties"],
}

export class BankAccountTransferMethod implements IBankAccountTransferMethod {
  private readonly _id: IBankAccountTransferMethod["id"];
  private _is_disabled: IBankAccountTransferMethod["is_disabled"]
  private readonly _created_at: IBankAccountTransferMethod["created_at"];
  private readonly _updated_at: IBankAccountTransferMethod["updated_at"];
  private readonly _bank_account: IBankAccountTransferMethod["bank_account"];
  private readonly _transfer_method: IBankAccountTransferMethod["transfer_method"];
  
  constructor({
    id,
    is_disabled,
    created_at,
    updated_at,
    transfer_method,
    bank_account,
  }: IBankAccountTransferMethod){
    this._id = id;
    this._is_disabled = is_disabled;
    this._created_at = created_at;
    this._updated_at = updated_at;
    this._bank_account = bank_account;
    this._transfer_method = transfer_method;
  }

  public get id(): BankAccountTransferMethod["_id"]{
    return this._id;
  }

  get is_disabled(): BankAccountTransferMethod["_is_disabled"]{
    return this._is_disabled
  }
  public enable(): void {
    this._is_disabled = true
  }
  public disable(): void {
    this._is_disabled = false
  }

  public get created_at(): BankAccountTransferMethod["_created_at"]{
    return this._created_at;
  }

  public get updated_at(): BankAccountTransferMethod["_updated_at"]{
    return this._updated_at;
  }

  public get bank_account(): BankAccountTransferMethod["_bank_account"]{
    return this._bank_account;
  }

  public get transfer_method(): BankAccountTransferMethod["_transfer_method"]{
    return this._transfer_method;
  }

  public get properties(): ReturnProperties {
    return {
      id: this._id,
      is_disabled: this._is_disabled,
      bank_account: this._bank_account["properties"],
      transfer_method: this._transfer_method["properties"],
      created_at: this._created_at,
      updated_at: this._updated_at,
    } as const
  }
}