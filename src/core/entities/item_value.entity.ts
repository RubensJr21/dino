/* eslint-disable jsdoc/require-jsdoc */
import { IEntityWithDates } from "../shared/interfaces/IEntityWithDates";
import { Variants_Of_ItemValue } from "../shared/types/variants_items";
import { Tag } from "./tag.entity";
import { TransferMethod } from "./transfer_method.entity";

export interface IItemValue extends IEntityWithDates {
  description: string;
  cashflow_type: Variants_Of_ItemValue;
  scheduled_at: Date;
  amount: number;
  was_processed: boolean;
  transfer_method: TransferMethod;
  tag: Tag;
}

export interface ReturnProperties_ItemValue extends StrictOmit<IItemValue, "tag" | "transfer_method"> {
  transfer_method: ItemValue["_transfer_method"]["properties"];
  tag: ItemValue["_tag"]["properties"];
}

export class ItemValue implements IItemValue {
  private readonly _id: IItemValue["id"];
  private _description: IItemValue["description"];
  private _cashflow_type: IItemValue["cashflow_type"];
  private _scheduled_at: IItemValue["scheduled_at"];
  private _amount: IItemValue["amount"];
  private _was_processed: IItemValue["was_processed"];
  private _transfer_method: IItemValue["transfer_method"];
  private _tag: IItemValue["tag"];
  private readonly _created_at: IItemValue["created_at"]
  private readonly _updated_at: IItemValue["updated_at"]

  constructor({
		id,
		description,
		cashflow_type,
		scheduled_at,
		amount,
		was_processed,
		transfer_method,
		tag,
    created_at,
    updated_at
	}: IItemValue){
    this._id = id;
		this._description = description;
		this._cashflow_type = cashflow_type;
    this._scheduled_at = scheduled_at;
    this._amount = amount;
    this._was_processed = was_processed;
    this._transfer_method = transfer_method;
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
  
  public get cashflow_type(): ItemValue["_cashflow_type"] {
    return this._cashflow_type
  }
  
  public change_cashflow_type(new_value: ItemValue["_cashflow_type"]): undefined | Error {
    this._cashflow_type = new_value
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

  
  public get transfer_method(): ItemValue["_transfer_method"] {
    return this._transfer_method
  }
  
  public change_transfer_method(new_value: ItemValue["_transfer_method"]): undefined | Error {
    this._transfer_method = new_value
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
			cashflow_type: this.cashflow_type,
			scheduled_at: this.scheduled_at,
			amount: this.amount,
			was_processed: this.was_processed,
			transfer_method: this.transfer_method.properties,
			tag: this.tag.properties,
      created_at: this.created_at,
      updated_at: this.updated_at
		} as const;
	}
}