import { BasicErrorCode } from "./BasicErrorCode";
import { RepoInterfaceNames } from "./RepoInterfaceNames";

type MethodKeys<T> =
  Extract<
    keyof T, string
  >;

type UseCaseCodeError =
  | BasicErrorCode
  | "empty_list"
  ;

interface UseCaseDomainError<
  UseCase extends string,
  Repo,
  RepoName extends RepoInterfaceNames,
  ErrorCode extends UseCaseCodeError = UseCaseCodeError
> {
  trace: UseCase | `${UseCase} > ${RepoName}`,
  method: MethodKeys<Repo> | "verification_in_use_case",
  code: ErrorCode,
  message: string
}

export type UseCaseResult<
  UseCase extends string,
  TData,
  repo,
  RepoName extends RepoInterfaceNames,
  TError extends UseCaseDomainError<UseCase, repo, RepoName> = UseCaseDomainError<UseCase, repo, RepoName>
> = 
  | { success: true, data: TData }
  | { success: false, error: TError }
  ;