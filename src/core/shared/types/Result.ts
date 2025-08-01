import { InternalRepoErrorsBankAccount } from "../interfaces/IRepoBankAccount";
import { InternalRepoErrorsBankAccountTransferMethod } from "../interfaces/IRepoBankAccountTransferMethod";
import { InternalRepoErrorsInstallment } from "../interfaces/IRepoInstallment";
import { InternalRepoErrorsItemValue } from "../interfaces/IRepoItemValue";
import { InternalRepoErrorsRecurrenceType } from "../interfaces/IRepoRecurrenceType";
import { InternalRepoErrorsRecurring } from "../interfaces/IRepoRecurring";
import { InternalRepoErrorsStandard } from "../interfaces/IRepoStandard";
import { InternalRepoErrorsTag } from "../interfaces/IRepoTag";
import { InternalRepoErrorsTransferMethod } from "../interfaces/IRepoTransferMethod";

export type ErrorCode =
  | "id_not_found"
  | "nickname_not_found"
  | "nickname_already_used"
  | "type_not_found"
  | "type_already_used"
  | "description_not_found"
  | "description_already_used"
  | "installment_number_less_than_2"
  | InternalRepoErrorsBankAccount
  | InternalRepoErrorsBankAccountTransferMethod
  | InternalRepoErrorsInstallment
  | InternalRepoErrorsItemValue
  | InternalRepoErrorsRecurrenceType
  | InternalRepoErrorsRecurring
  | InternalRepoErrorsStandard
  | InternalRepoErrorsTag
  | InternalRepoErrorsTransferMethod
  ;

export interface DomainError<
  Scope extends string = string,
  Code extends ErrorCode = ErrorCode
> {
  /** domínio ou entidade que gerou o erro, ex: "installment", "user", etc */
  scope: Scope;
  /** código do tipo de falha */
  code: Code;
  /** mensagem legível */
  message: string;
}

export type Result<
  TData,
  TError extends DomainError = DomainError
> =
  | { success: true, data: TData }
  | { success: false, error: TError }
  ;