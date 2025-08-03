import { RepoResult } from "../../types/Result_v2";
import IEntityBase from "./IEntityBase";

export type CreateRepositoryParams<T extends IEntityBase> = StrictOmit<T, "id">
export type UpdateRepositoryParams<T extends IEntityBase> = StrictOmit<T, "id">

export interface IRepository<T extends IEntityBase, U extends IEntityBase, Repository> {
  create(data: CreateRepositoryParams<T>): RepoResult<U, Repository>;
  find_by_id(id: T["id"]): RepoResult<U, Repository>;
  find_all(): RepoResult<U[], Repository>;
  update(id: T["id"], data: UpdateRepositoryParams<T>): RepoResult<U, Repository>;
  delete(id: T["id"]): RepoResult<boolean, Repository>;
}