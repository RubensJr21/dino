import IEntityBase from "./IEntityBase";

export interface IEntityWithDates extends IEntityBase {
  created_at: Date;
  updated_at: Date;
}