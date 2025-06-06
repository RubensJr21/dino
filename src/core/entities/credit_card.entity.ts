/* eslint-disable jsdoc/require-jsdoc */
import { IEntityWithDates } from "../shared/IEntityWithDates";

export interface ICreditCard extends IEntityWithDates {
  nickname: string;
  last_four_digits: string;
  limit: number;
  closing_date: Date;
  due_date: Date;
  is_disabled: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
}

type ReturnProperties = ICreditCard

export class CreditCard implements ICreditCard {
  private _id: ICreditCard["id"];
  private _nickname: ICreditCard["nickname"];
  private _last_four_digits: ICreditCard["last_four_digits"];
  private _limit: ICreditCard["limit"];
  private _closing_date: ICreditCard["closing_date"];
  private _due_date: ICreditCard["due_date"];
  private _is_disabled: ICreditCard["is_disabled"];
  private _created_at: ICreditCard["created_at"];
  private _updated_at: ICreditCard["updated_at"];
  
  constructor({
    id,
    nickname,
    last_four_digits,
    limit,
    closing_date,
    due_date,
    is_disabled,
    created_at,
    updated_at
  }: ICreditCard){
    this._id = id
    this._nickname = nickname
    this._last_four_digits = last_four_digits
    this._limit = limit
    this._closing_date = closing_date
    this._due_date = due_date
    this._is_disabled = is_disabled
    this._created_at = created_at
    this._updated_at = updated_at
  }

  public get id(): CreditCard["_id"] {
    return this._id
  }

  public get nickname(): CreditCard["_nickname"] {
    return this._nickname
  }
  public change_nickname(new_value: ICreditCard["nickname"]): void {
    this._nickname = new_value
  }

  public get last_four_digits(): CreditCard["_last_four_digits"] {
    return this._last_four_digits
  }

  public get limit(): CreditCard["_limit"] {
    return this._limit
  }
  public change_limit(new_value: ICreditCard["limit"]): void {
    this._limit = new_value
  }

  public get closing_date(): CreditCard["_closing_date"] {
    return this._closing_date
  }
  public change_closing_date(new_value: ICreditCard["closing_date"]) : void {
    this._closing_date = new_value
  }

  public get due_date(): CreditCard["_due_date"] {
    return this._due_date
  }
  public change_due_date(new_value: ICreditCard["due_date"]) : void {
    this._due_date = new_value
  }

  public get is_disabled(): CreditCard["_is_disabled"] {
    return this._is_disabled
  }
  public enable(): void {
    this._is_disabled = false;
  }
  public disable(): void {
    this._is_disabled = true;
  }

  public get created_at(): CreditCard["_created_at"] {
    return this._created_at
  }

  public get updated_at(): CreditCard["_updated_at"] {
    return this._updated_at
  }

  get properties(): ReturnProperties {
    return {
      id: this.id,
      nickname: this.nickname,
      last_four_digits: this.last_four_digits,
      limit: this.limit,
      closing_date: this.closing_date,
      due_date: this.due_date,
      is_disabled: this.is_disabled,
      created_at: this.created_at,
      updated_at: this.updated_at,
    } as const
  }
}