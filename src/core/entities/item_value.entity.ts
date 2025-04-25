import { ABaseItemValue, IBaseItemValue } from "./base_item_value.entity";
import { Tag } from "./tag.entity";
import { TransferMethodType } from "./transfer_method_type.entity";

export interface IItemValue extends IBaseItemValue {
  readonly id: number;
}

interface ReturnProperties extends StrictOmit<IItemValue, "tag" | "transfer_method_type"> {
  transfer_method_type: TransferMethodType["properties"];
  tag: Tag["properties"];
}

export class ItemValue extends ABaseItemValue implements IItemValue {
  protected readonly _id: IItemValue["id"];
	protected readonly _biv_id: IItemValue["biv_id"];
	protected _description: IItemValue["description"];
	protected _type: IItemValue["type"];
	protected _scheduled_at: IItemValue["scheduled_at"];
	protected _amount: IItemValue["amount"];
	protected _was_processed: IItemValue["was_processed"];
	protected _transfer_method_type: IItemValue["transfer_method_type"];
	protected _tag: IItemValue["tag"];
  protected _created_at: Date;
  protected _updated_at: Date;

  constructor({
		id,
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
  }: IItemValue) {
    super();
    this._id = id;
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

  public get id(): IItemValue["id"] {
    return this._id
  }

  get properties(): ReturnProperties {
		return {
			id: this.id,
			description: this.description,
			type: this.type,
			scheduled_at: this.scheduled_at,
			amount: this.amount,
			was_processed: this.was_processed,
			transfer_method_type: this.transfer_method_type.properties,
			tag: this.tag.properties,
      created_at: this._created_at,
      updated_at: this._updated_at
		};
	}
}
