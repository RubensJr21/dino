import { Result } from "../../types/Result";
import IEntityBase from "./IEntityBase";

export type CreateRepositoryParams<T extends IEntityBase> = StrictOmit<T, "id">
export type UpdateRepositoryParams<T extends IEntityBase> = StrictOmit<T, "id">

export interface IRepository<T extends IEntityBase, U extends IEntityBase> {
  create(data: CreateRepositoryParams<T>): Result<U>;
  find_by_id(id: T["id"]): Result<U>;
  find_all(): Result<U[]>;
  update(id: T["id"], data: UpdateRepositoryParams<T>): Result<U>;
  delete(id: T["id"]): Result<boolean>;
}