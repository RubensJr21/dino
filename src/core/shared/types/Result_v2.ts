import { MethodKeys } from "./InternalRepoErrors";

export type EntityNames = 
  | "BankAccount"
  | "BankAccountTransferMethod"
  | "Installment"
  | "ItemValue"
  | "Recurring"
  | "Standard"
  | "Tag"
  | "TransferMethod"
  | "RecurrenceType"
  ;

type BasicErrorCode = 
  | "id_not_found"
  | "nickname_not_found"
  | "nickname_already_used"
  | "type_not_found"
  | "type_already_used"
  | "description_not_found"
  | "description_already_used"
  | "installment_number_less_than_2"
  | "Z_INTERNAL_REPO_ERROR"
  ;

export interface RepoDomainError<
  Repo,
  ErrorCode extends BasicErrorCode = BasicErrorCode
> {
  scope: `${EntityNames}`,
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