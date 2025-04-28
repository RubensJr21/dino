import { ABaseItemValue, IBaseItemValue } from "./base_item_value.entity";
import { RecurrenceType } from "./recurrence_type.entity";

export interface IRecurringItemValue extends IBaseItemValue {
  readonly id: number;
  is_disabled: boolean;
  recurrence_type: RecurrenceType;
}

interface ReturnProperties extends StrictOmit<IRecurringItemValue, "tag" | "transfer_method_type" | "recurrence_type"> {
  transfer_method_type: ABaseItemValue["_transfer_method_type"]["properties"];
  tag: ABaseItemValue["tag"]["properties"];
  recurrence_type: RecurrenceType["properties"]
}

export class RecurringItemValue extends ABaseItemValue implements IRecurringItemValue {
  private readonly _id: IRecurringItemValue["id"];
  private _is_disabled: IRecurringItemValue["is_disabled"];
  private _recurrence_type: IRecurringItemValue["recurrence_type"];

  protected _biv_id?: IRecurringItemValue["biv_id"];
  protected _description: IRecurringItemValue["description"];
  protected _type: IRecurringItemValue["type"];
  protected _scheduled_at: IRecurringItemValue["scheduled_at"];
  protected _amount: IRecurringItemValue["amount"];
  protected _was_processed: IRecurringItemValue["was_processed"];
  protected _transfer_method_type: IRecurringItemValue["transfer_method_type"];
  protected _tag: IRecurringItemValue["tag"];
  protected readonly _created_at: IRecurringItemValue["created_at"];
  protected readonly _updated_at: IRecurringItemValue["updated_at"];

  constructor({
		id,
    is_disabled,
    recurrence_type,
		biv_id,
		description,
		type,
		scheduled_at,
		amount,
		was_processed,
		transfer_method_type,
		tag,
    created_at,
    updated_at
	}: IRecurringItemValue) {
		super();
		this._id = id;
    this._is_disabled = is_disabled;
    this._recurrence_type = recurrence_type;
		this._biv_id = biv_id;
		this._description = description;
		this._type = type,
    this._scheduled_at = scheduled_at,
    this._amount = amount,
    this._was_processed = was_processed,
    this._transfer_method_type = transfer_method_type,
    this._tag = tag;
    this._created_at = created_at;
    this._updated_at = updated_at;
	}

  public get id(): RecurringItemValue["_id"] {
    return this._id
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

  get properties(): ReturnProperties {
		return {
			id: this.id,
      is_disabled: this.is_disabled,
      recurrence_type: this.recurrence_type.properties,
			description: this.description,
			type: this.type,
			scheduled_at: this.scheduled_at,
			amount: this.amount,
			was_processed: this.was_processed,
			transfer_method_type: this.transfer_method_type.properties,
			tag: this.tag.properties,
      created_at: this._created_at,
      updated_at: this._updated_at
		} as const;
	}

}