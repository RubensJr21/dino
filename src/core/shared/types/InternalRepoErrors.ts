type MethodKeys<T> =
  Exclude<
    Extract<
      keyof T, string
    >,
    | "__repository_name"
  >;

export type InternalRepoErrors<
  T,
  __repository_name extends string
> =
  `internal_repo_error_${__repository_name}(#${MethodKeys<T>})`