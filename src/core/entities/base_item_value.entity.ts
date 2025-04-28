import { Tag } from "./tag.entity";
import { TransferMethodType } from "./transfer_method_type.entity";

export interface IBaseItemValue {
  readonly biv_id?: number;
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

export abstract class ABaseItemValue implements IBaseItemValue {
  protected abstract readonly _biv_id?: IBaseItemValue["biv_id"];
  protected abstract _description: IBaseItemValue["description"];
  protected abstract _type: IBaseItemValue["type"];
  protected abstract _scheduled_at: IBaseItemValue["scheduled_at"];
  protected abstract _amount: IBaseItemValue["amount"];
  protected abstract _was_processed: IBaseItemValue["was_processed"];
  protected abstract _transfer_method_type: IBaseItemValue["transfer_method_type"];
  protected abstract _tag: IBaseItemValue["tag"];
  protected abstract readonly _created_at: IBaseItemValue["created_at"]
  protected abstract readonly _updated_at: IBaseItemValue["updated_at"]

  public get biv_id(): ABaseItemValue["_biv_id"] {
    return this._biv_id
  }
  public get description(): ABaseItemValue["_description"] {
    return this._description
  }
  public change_description(new_value: ABaseItemValue["description"]): undefined | Error {
    this._description = new_value
    return undefined;
  }
  public get type(): ABaseItemValue["_type"] {
    return this._type
  }
  public change_type(new_value: string): undefined | Error {
    if(!["Entrada", "Saída"].includes(new_value)){
      return new Error("Os tipos aceitos são: Entrada e Saída");
    }
    this._type = new_value
    return undefined;
  }
  public get scheduled_at(): ABaseItemValue["_scheduled_at"] {
    return this._scheduled_at
  }
  public change_scheduled_at(new_value: ABaseItemValue["_scheduled_at"]): undefined | Error {
    this._scheduled_at = new_value
    return undefined;
  }
  public get amount(): ABaseItemValue["_amount"] {
    return this._amount
  }
  public change_amount(new_value: ABaseItemValue["_amount"]): undefined | Error {
    if(new_value <= 0){
      return new Error("O valor precisa ser maior que 0")
    }
    this._amount = new_value
    return undefined;
  }
  public get was_processed(): ABaseItemValue["_was_processed"] {
    return this._was_processed
  }
  public change_was_processed(new_value: ABaseItemValue["_was_processed"]): undefined | Error {
    this._was_processed = new_value
    return undefined;
  }
  public get transfer_method_type(): ABaseItemValue["_transfer_method_type"] {
    return this._transfer_method_type
  }
  public change_transfer_method_type(new_value: ABaseItemValue["_transfer_method_type"]): undefined | Error {
    this._transfer_method_type = new_value
    return undefined;
  }
  public get tag(): ABaseItemValue["_tag"] {
    return this._tag
  }
  public change_tag(new_value: ABaseItemValue["_tag"]): undefined | Error {
    this._tag = new_value
    return undefined;
  }
  public get created_at(): ABaseItemValue["_created_at"] {
    return this._created_at
  }
  public get updated_at(): ABaseItemValue["_updated_at"] {
    return this._updated_at
  }
}