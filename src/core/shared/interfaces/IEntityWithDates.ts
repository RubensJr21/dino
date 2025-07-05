import IEntityBase from "./IEntityBase";

export interface IEntityWithDates extends IEntityBase {
  readonly created_at: Date;
  readonly updated_at: Date;
}