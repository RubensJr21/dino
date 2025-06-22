/* eslint-disable jsdoc/require-jsdoc */
import IEntityBase from "../shared/interfaces/IEntityBase";
import { BankAccount } from "./bank_account.entity";
import { TransferMethod } from "./transfer_method.entity";

export interface IBankAccountTransferMethod extends IEntityBase {
  method: string;
  readonly bank_account: BankAccount;
  readonly transfer_method: TransferMethod;
}

interface ReturnProperties extends StrictOmit<IBankAccountTransferMethod, "bank_account"|"transfer_method"> {
  bank_account: BankAccount["properties"],
  transfer_method: TransferMethod["properties"],
}

export class BankAccountTransferMethod implements IBankAccountTransferMethod {
  private readonly _id: IBankAccountTransferMethod["id"];
  private _type: IBankAccountTransferMethod["method"];
  private readonly _bank_account: IBankAccountTransferMethod["bank_account"];
  private readonly _transfer_method: IBankAccountTransferMethod["transfer_method"];
  
  constructor({
    id,
    method,
    transfer_method,
    bank_account,
  }: IBankAccountTransferMethod){
    this._id = id;
    this._type = method;
    this._bank_account = bank_account;
    this._transfer_method = transfer_method;
  }

  public get id(): BankAccountTransferMethod["_id"]{
    return this._id;
  }

  public get method(): BankAccountTransferMethod["_type"]{
    return this._type;
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
      method: this._type,
      bank_account: this._bank_account["properties"],
      transfer_method: this._transfer_method["properties"],
    } as const
  }
}