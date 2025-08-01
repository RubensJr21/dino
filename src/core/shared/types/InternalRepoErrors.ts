import { EntityNames } from "./Result_v2";

export type MethodKeys<T> =
  Extract<
    keyof T, string
  >;

export type InternalRepoErrors<
  T,
  __entity_name extends EntityNames
> =
  `internal_repo_error_${__entity_name}(#${MethodKeys<T>})`