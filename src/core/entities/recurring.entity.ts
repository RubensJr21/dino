import { IEntityWithDates } from "../shared/interfaces/bases/IEntityWithDates";
import { RecurrenceType } from "./recurrence_type.entity";

export interface IRecurring extends IEntityWithDates {
  is_disabled: boolean;
  start_date: Date;
  end_date?: Date;
  current_amount: number;
  recurrence_type: RecurrenceType;
}

interface ReturnProperties extends StrictOmit<IRecurring, "recurrence_type"> {
  recurrence_type: RecurrenceType["properties"]
}

export class Recurring implements IRecurring {
  private _id: IRecurring["id"];
  private _start_date: IRecurring["start_date"];
  private _end_date: IRecurring["end_date"];
  private _current_amount: IRecurring["current_amount"]
  private _recurrence_type: IRecurring["recurrence_type"];
  private readonly _created_at: IRecurring["created_at"]
  private readonly _updated_at: IRecurring["updated_at"]

  constructor({
    id,
    start_date,
    end_date,
    current_amount,
    recurrence_type,
		created_at,
    updated_at
	}: StrictOmit<IRecurring, "is_disabled">) {
    this._id = id;
    this._start_date = start_date;
    this._end_date = end_date;
    this._current_amount = current_amount;
    this._recurrence_type = recurrence_type;
    this._created_at = created_at;
    this._updated_at = updated_at;
	}

  public get id(): IRecurring["id"]{
    return this._id;
  }

  public get is_disabled(): IRecurring["is_disabled"] {
    return this._end_date != undefined;
  }
  public enable(): void {
    if(this.end_date !== undefined){
      // Não está HABILITADO
      // start_date = new Date; end_date = undefined
      this._start_date = new Date();
      this._end_date = undefined;
      return;
    }
  }
  public disable(): void {
    if(this.end_date !== undefined){
      // Está HABILITADO
      // start_date = new Date; end_date = undefined
      this._end_date = new Date();
      return;
    }
  }

  public get start_date(): Recurring["_start_date"] {
    return this._start_date
  }
  
  public get end_date(): Recurring["_end_date"] {
    return this._end_date
  }

  public get current_amount(): Recurring["_current_amount"] {
    return this._current_amount;
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
      start_date: this._start_date,
      end_date: this._end_date,
      current_amount: this.current_amount,
      is_disabled: this.is_disabled,
      recurrence_type: this.recurrence_type.properties,
      created_at: this.created_at,
      updated_at: this.updated_at
		} as const;
	}
}