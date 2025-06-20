/* eslint-disable jsdoc/require-jsdoc */
import { IEntityWithDates } from "../shared/IEntityWithDates";
import { ItemValue } from "./item_value.entity";
import { RecurrenceType } from "./recurrence_type.entity";

export interface IRecurring extends IEntityWithDates {
  readonly id: number;
  is_disabled: boolean;
  current_amount: number;
  itens: ItemValue[];
  recurrence_type: RecurrenceType;
}

interface ReturnProperties extends StrictOmit<IRecurring, "recurrence_type">{
  is_disabled: boolean;
  recurrence_type: RecurrenceType["properties"]
}

export class Recurring implements IRecurring {
  private _id: IRecurring["id"];
  private _is_disabled: IRecurring["is_disabled"];
  private _current_amount: IRecurring["current_amount"]
  private _recurrence_type: IRecurring["recurrence_type"];
  private _itens: ItemValue[];
  private readonly _created_at: IRecurring["created_at"]
  private readonly _updated_at: IRecurring["updated_at"]

  constructor({
    id,
    is_disabled,
    current_amount,
    recurrence_type,
    itens,
		created_at,
    updated_at
	}: IRecurring) {
    this._id = id;
    this._is_disabled = is_disabled;
    this._current_amount = current_amount;
    this._recurrence_type = recurrence_type;
    this._itens = itens;
    this._created_at = created_at;
    this._updated_at = updated_at;
	}

  public get id(): IRecurring["id"]{
    return this._id;
  }

  public get is_disabled(): Recurring["_is_disabled"] {
    return this._is_disabled;
  }
  public enabled(): void {
    this._is_disabled = false;
  }
  public disable(): void {
    this._is_disabled = true;
  }

  public get current_amount(): Recurring["_current_amount"] {
    return this._current_amount;
  }

  public get itens(): ItemValue[] {
    return this._itens;
  }

  public get recurrence_type(): Recurring["_recurrence_type"] {
    return this._recurrence_type
  }
  public change_recurrence_type(new_value: Recurring["_recurrence_type"]): void {
    this._recurrence_type = new_value;
  }

  public get created_at(): Recurring["_created_at"] {
    return this._created_at
  }
  
  public get updated_at(): Recurring["_updated_at"] {
    return this._updated_at
  }

  // @Override
  get properties(): ReturnProperties {
		return {
      id: this.id,
      current_amount: this.current_amount,
      itens: this.itens,
      is_disabled: this.is_disabled,
      recurrence_type: this.recurrence_type.properties,
      created_at: this.created_at,
      updated_at: this.updated_at
		} as const;
	}
}