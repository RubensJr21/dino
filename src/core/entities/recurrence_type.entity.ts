/* eslint-disable jsdoc/require-jsdoc */
import IEntityBase from "../shared/IEntityBase";

export interface IRecurrenceType extends IEntityBase{
  readonly id: number;
  type: string
}

type ReturnProperties = IRecurrenceType

export class RecurrenceType implements IRecurrenceType {
  private _id: IRecurrenceType["id"];
  private _type: IRecurrenceType["type"];

  constructor({
    id,
    type
  }: IRecurrenceType){
    this._id = id;
    this._type = type;
  }

  public get id(): RecurrenceType["_id"] {
    return this._id
  }

  public get type(): RecurrenceType["_type"] {
    return this._type
  }
  public change_type(new_value: RecurrenceType["_type"]): void {
    this._type = new_value
  }

  get properties(): ReturnProperties {
    return {
      id: this.id,
      type: this.type
    } as const
  }
}