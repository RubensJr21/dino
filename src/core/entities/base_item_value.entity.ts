/* eslint-disable jsdoc/require-jsdoc */
import { IEntityWithDates } from "../shared/IEntityWithDates";
import { Tag } from "./tag.entity";
import { TransferMethodType } from "./transfer_method_type.entity";

export interface IBaseItemValue extends IEntityWithDates {
  readonly fk_id_base_item_value: number;
  description: string;
  type: string;
  scheduled_at: Date;
  amount: number;
  was_processed: boolean;
  transfer_method_type: TransferMethodType;
  tag: Tag;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export interface ReturnProperties_BaseItemValue extends StrictOmit<IBaseItemValue, "tag" | "transfer_method_type"> {
  transfer_method_type: BaseItemValue["_transfer_method_type"]["properties"];
  tag: BaseItemValue["_tag"]["properties"];
}

export abstract class BaseItemValue implements IBaseItemValue {
  private readonly _id: IBaseItemValue["id"];
  private readonly _fk_id_base_item_value: IBaseItemValue["fk_id_base_item_value"];
  private _description: IBaseItemValue["description"];
  private _type: IBaseItemValue["type"];
  private _scheduled_at: IBaseItemValue["scheduled_at"];
  private _amount: IBaseItemValue["amount"];
  private _was_processed: IBaseItemValue["was_processed"];
  private _transfer_method_type: IBaseItemValue["transfer_method_type"];
  private _tag: IBaseItemValue["tag"];
  private readonly _created_at: IBaseItemValue["created_at"]
  private readonly _updated_at: IBaseItemValue["updated_at"]

  constructor({
		id,
		fk_id_base_item_value,
		description,
		type,
		scheduled_at,
		amount,
		was_processed,
		transfer_method_type,
		tag,
    created_at,
    updated_at
	}: IBaseItemValue){
    this._id = id;
		this._fk_id_base_item_value = fk_id_base_item_value;
		this._description = description;
		this._type = type;
    this._scheduled_at = scheduled_at;
    this._amount = amount;
    this._was_processed = was_processed;
    this._transfer_method_type = transfer_method_type;
    this._tag = tag;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  public get id(): BaseItemValue["_id"] {
		return this._id;
	}
  
  public get fk_id_base_item_value(): BaseItemValue["_fk_id_base_item_value"] {
    return this._fk_id_base_item_value
  }
  
  public get description(): BaseItemValue["_description"] {
    return this._description
  }
  
  public change_description(new_value: BaseItemValue["description"]): undefined | Error {
    this._description = new_value
    return undefined;
  }
  
  public get type(): BaseItemValue["_type"] {
    return this._type
  }
  
  public change_type(new_value: string): undefined | Error {
    if(!["Entrada", "Saída"].includes(new_value)){
      return new Error("Os tipos aceitos são: Entrada e Saída");
    }
    this._type = new_value
    return undefined;
  }
  
  public get scheduled_at(): BaseItemValue["_scheduled_at"] {
    return this._scheduled_at
  }
  
  public change_scheduled_at(new_value: BaseItemValue["_scheduled_at"]): undefined | Error {
    this._scheduled_at = new_value
    return undefined;
  }
  
  public get amount(): BaseItemValue["_amount"] {
    return this._amount
  }
  
  public change_amount(new_value: BaseItemValue["_amount"]): undefined | Error {
    if(new_value <= 0){
      return new Error("O valor precisa ser maior que 0")
    }
    this._amount = new_value
    return undefined;
  }

  
  public get was_processed(): BaseItemValue["_was_processed"] {
    return this._was_processed
  }
  
  markAsProcessed(): void {
    this._was_processed = true;
  }
  
  markAsUnprocessed(): void {
    this._was_processed = false;
  }

  
  public get transfer_method_type(): BaseItemValue["_transfer_method_type"] {
    return this._transfer_method_type
  }
  
  public change_transfer_method_type(new_value: BaseItemValue["_transfer_method_type"]): undefined | Error {
    this._transfer_method_type = new_value
    return undefined;
  }
  
  public get tag(): BaseItemValue["_tag"] {
    return this._tag
  }
  
  public change_tag(new_value: BaseItemValue["_tag"]): undefined | Error {
    this._tag = new_value
    return undefined;
  }
  
  public get created_at(): BaseItemValue["_created_at"] {
    return this._created_at
  }
  
  public get updated_at(): BaseItemValue["_updated_at"] {
    return this._updated_at
  }
  
  get properties(): ReturnProperties_BaseItemValue {
		return {
			id: this.id,
      fk_id_base_item_value: this.fk_id_base_item_value,
			description: this.description,
			type: this.type,
			scheduled_at: this.scheduled_at,
			amount: this.amount,
			was_processed: this.was_processed,
			transfer_method_type: this.transfer_method_type.properties,
			tag: this.tag.properties,
      created_at: this.created_at,
      updated_at: this.updated_at
		} as const;
	}
}