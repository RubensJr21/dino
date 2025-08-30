import { RepoResult } from "@core-types/Result_v2";
import { IEntityWithDates } from "../entities/IEntityWithDates";

export type CreateRepositoryWithDatesParams<T extends IEntityWithDates> = StrictOmit<T, "id"|"created_at"|"updated_at">;
export type UpdateRepositoryWithDatesParams<T extends IEntityWithDates> = StrictOmit<T, "id"|"created_at"|"updated_at">;

export interface IRepositoryWithDates<T extends IEntityWithDates, U extends IEntityWithDates, Repository> {
  create(data: CreateRepositoryWithDatesParams<T>): RepoResult<U, Repository>;
  find_by_id(id: T["id"]): RepoResult<U, Repository>;
  find_all(): RepoResult<U[], Repository>;
  update(id: T["id"], data: UpdateRepositoryWithDatesParams<T>): RepoResult<U, Repository>;
  delete(id: T["id"]): RepoResult<boolean, Repository>;
}
