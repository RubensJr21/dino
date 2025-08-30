import { BasicErrorCode } from "../errors/BasicErrorCode";
import { RepoInterfaceNames } from "./enum/RepoInterfaceNames";

type MethodKeys<T> =
  Extract<
    keyof T, string
  >;

export interface RepoDomainError<
  Repo,
  ErrorCode extends BasicErrorCode = BasicErrorCode
> {
  scope: RepoInterfaceNames,
  method: MethodKeys<Repo>,
  code: ErrorCode,
  message: string
}

export type RepoResult<
  TData,
  repo,
  TError extends RepoDomainError<repo> = RepoDomainError<repo>
> = 
  | { success: true, data: TData }
  | { success: false, error: TError }
  ;