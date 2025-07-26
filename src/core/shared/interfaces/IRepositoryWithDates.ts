import { Result } from "../types/Result";
import { IEntityWithDates } from "./IEntityWithDates";

export type CreateRepositoryWithDatesParams<T extends IEntityWithDates> = StrictOmit<T, "id"|"created_at"|"updated_at">;
export type UpdateRepositoryWithDatesParams<T extends IEntityWithDates> = StrictOmit<T, "id"|"created_at"|"updated_at">;

export interface IRepositoryWithDates<T extends IEntityWithDates, U extends IEntityWithDates> {
  create(data: CreateRepositoryWithDatesParams<T>): Result<U>;
  findById(id: T["id"]): Result<U>;
  findAll(): Result<U[]>;
  update(id: T["id"], data: UpdateRepositoryWithDatesParams<T>): Result<U>;
  delete(id: T["id"]): Result<boolean>;
}
