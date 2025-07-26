import { IEntityWithDates } from "../shared/interfaces/IEntityWithDates";
import { ItemValue } from "./item_value.entity";

export interface IStandard extends IEntityWithDates {
  item_value: ItemValue;
} 

export class Standard implements IStandard {
  private readonly _id: IStandard["id"]
  private _item_value: IStandard["item_value"]
  private readonly _created_at: IStandard["created_at"]
  private readonly _updated_at: IStandard["updated_at"]

  constructor({
    id,
    item_value,
    created_at,
    updated_at
  }: IStandard) {
    this._id = id;
    this._item_value = item_value;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  public get id(): IStandard["id"] {
    return this._id
  }
  public get item_value(): IStandard["item_value"] {
    return this._item_value
  }
  public get created_at(): IStandard["created_at"] {
    return this._created_at
  }
  public get updated_at(): IStandard["updated_at"] {
    return this._updated_at
  }
}
