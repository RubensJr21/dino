import { IEntityWithDates } from "./IEntityWithDates";

export interface IBankAccount extends IEntityWithDates {
  nickname: string;
  // ALERT: Remover atributo is_disabled da entidade
  is_disabled: boolean;
  balance: number;
}

type ReturnProperties = IBankAccount

export class BankAccount implements IBankAccount {
  private readonly _id: IBankAccount["id"]
  private _nickname: IBankAccount["nickname"]
  private _is_disabled: IBankAccount["is_disabled"]
  private _balance: IBankAccount["balance"]
  private readonly _created_at: IBankAccount["created_at"]
  private readonly _updated_at: IBankAccount["updated_at"]
  
  constructor({
    id,
    nickname,
    is_disabled,
    balance,
    created_at,
    updated_at,
  }: IBankAccount){
    this._id = id
    this._nickname = nickname
    this._is_disabled = is_disabled
    this._balance = balance
    this._created_at = created_at
    this._updated_at = updated_at
  }
  
  public get id(): BankAccount["_id"] {
    return this._id;
  }

  public get nickname(): BankAccount["_nickname"] {
    return this._nickname;
  }
  public change_nickname(new_value: BankAccount["_nickname"]) {
    this._nickname = new_value;
  }

  public get is_disabled(): BankAccount["_is_disabled"] {
    return this._is_disabled;
  }
  public enable(): void {
    this._is_disabled = false;
  }
  public disable(): void {
    this._is_disabled = true;
  }

  public get balance(): BankAccount["_balance"] {
    return this._balance;
  }
  public change_balance(new_value: BankAccount["_balance"]) {
    this._balance = new_value;
  }

  public get created_at(): BankAccount["_created_at"] {
    return this._created_at;
  }

  public get updated_at(): BankAccount["_updated_at"] {
    return this._updated_at;
  }

  get properties(): ReturnProperties {
    return {
      id: this.id,
      nickname: this.nickname,
      is_disabled: this.is_disabled,
      balance: this.balance,
      created_at: this.created_at,
      updated_at: this.updated_at,
    } as const
  }
}