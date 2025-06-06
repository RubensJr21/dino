/* eslint-disable jsdoc/require-jsdoc */
import { BaseItemValue, IBaseItemValue, ReturnProperties_BaseItemValue } from "./base_item_value.entity";
import { RecurrenceType } from "./recurrence_type.entity";

export interface IRecurringItemValue extends IBaseItemValue {
  readonly id: number;
  is_disabled: boolean;
  recurrence_type: RecurrenceType;
}

interface ReturnProperties extends ReturnProperties_BaseItemValue {
  is_disabled: boolean;
  recurrence_type: RecurrenceType["properties"]
}

export class RecurringItemValue extends BaseItemValue implements IRecurringItemValue {
  private _is_disabled: IRecurringItemValue["is_disabled"];
  private _recurrence_type: IRecurringItemValue["recurrence_type"];

  constructor({
    is_disabled,
    recurrence_type,
		...props
	}: IRecurringItemValue) {
		super(props);
    this._is_disabled = is_disabled;
    this._recurrence_type = recurrence_type;
	}

  public get is_disabled(): RecurringItemValue["_is_disabled"] {
    return this._is_disabled;
  }
  public enabled(): void {
    this._is_disabled = false;
  }
  public disable(): void {
    this._is_disabled = true;
  }

  public get recurrence_type(): RecurringItemValue["_recurrence_type"] {
    return this._recurrence_type
  }
  public change_recurrence_type(new_value: RecurringItemValue["_recurrence_type"]): void {
    this._recurrence_type = new_value;
  }

  // @Override
  get properties(): ReturnProperties {
		return {
      ...super.properties,
      is_disabled: this.is_disabled,
      recurrence_type: this.recurrence_type.properties,
		} as const;
	}
}