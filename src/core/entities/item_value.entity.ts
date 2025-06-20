/* eslint-disable jsdoc/require-jsdoc */
import { IEntityWithDates } from "../shared/IEntityWithDates";
import { Tag } from "./tag.entity";
import { TransferMethodType } from "./transfer_method_type.entity";

export interface IItemValue extends IEntityWithDates {
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

export interface ReturnProperties_ItemValue extends StrictOmit<IItemValue, "tag" | "transfer_method_type"> {
  transfer_method_type: ItemValue["_transfer_method_type"]["properties"];
  tag: ItemValue["_tag"]["properties"];
}

export class ItemValue implements IItemValue {
  private readonly _id: IItemValue["id"];
  private _description: IItemValue["description"];
  private _type: IItemValue["type"];
  private _scheduled_at: IItemValue["scheduled_at"];
  private _amount: IItemValue["amount"];
  private _was_processed: IItemValue["was_processed"];
  private _transfer_method_type: IItemValue["transfer_method_type"];
  private _tag: IItemValue["tag"];
  private readonly _created_at: IItemValue["created_at"]
  private readonly _updated_at: IItemValue["updated_at"]

  constructor({
		id,
		description,
		type,
		scheduled_at,
		amount,
		was_processed,
		transfer_method_type,
		tag,
    created_at,
    updated_at
	}: IItemValue){
    this._id = id;
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

  public get id(): ItemValue["_id"] {
		return this._id;
	}
  
  public get description(): ItemValue["_description"] {
    return this._description
  }
  
  public change_description(new_value: ItemValue["description"]): undefined | Error {
    this._description = new_value
    return undefined;
  }
  
  public get type(): ItemValue["_type"] {
    return this._type
  }
  
  public change_type(new_value: string): undefined | Error {
    if(!["Entrada", "Saída"].includes(new_value)){
      return new Error("Os tipos aceitos são: Entrada e Saída");
    }
    this._type = new_value
    return undefined;
  }
  
  public get scheduled_at(): ItemValue["_scheduled_at"] {
    return this._scheduled_at
  }
  
  public change_scheduled_at(new_value: ItemValue["_scheduled_at"]): undefined | Error {
    this._scheduled_at = new_value
    return undefined;
  }
  
  public get amount(): ItemValue["_amount"] {
    return this._amount
  }
  
  public change_amount(new_value: ItemValue["_amount"]): undefined | Error {
    if(new_value <= 0){
      return new Error("O valor precisa ser maior que 0")
    }
    this._amount = new_value
    return undefined;
  }

  
  public get was_processed(): ItemValue["_was_processed"] {
    return this._was_processed
  }
  
  markAsProcessed(): void {
    this._was_processed = true;
  }
  
  markAsUnprocessed(): void {
    this._was_processed = false;
  }

  
  public get transfer_method_type(): ItemValue["_transfer_method_type"] {
    return this._transfer_method_type
  }
  
  public change_transfer_method_type(new_value: ItemValue["_transfer_method_type"]): undefined | Error {
    this._transfer_method_type = new_value
    return undefined;
  }
  
  public get tag(): ItemValue["_tag"] {
    return this._tag
  }
  
  public change_tag(new_value: ItemValue["_tag"]): undefined | Error {
    this._tag = new_value
    return undefined;
  }
  
  public get created_at(): ItemValue["_created_at"] {
    return this._created_at
  }
  
  public get updated_at(): ItemValue["_updated_at"] {
    return this._updated_at
  }
  
  get properties(): ReturnProperties_ItemValue {
		return {
			id: this.id,
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