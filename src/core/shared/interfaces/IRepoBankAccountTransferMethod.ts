import { BankAccount } from "@core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { MBankAccountTransferMethod } from "@src/core/models/bank_account_transfer_method.model";
import { ErrorFromMethodsOfInterface } from "../types/ErrorFromMethods";
import { Result } from "../types/Result";
import { CreateRepositoryWithDatesParams, IRepositoryWithDates, UpdateRepositoryWithDatesParams } from "./bases/IRepositoryWithDates";

export type CreateBankAccountTransferMethodTypeParams = CreateRepositoryWithDatesParams<MBankAccountTransferMethod>
export type UpdateBankAccountTransferMethodTypeParams = UpdateRepositoryWithDatesParams<MBankAccountTransferMethod>

export type CodeErrorsBankAccountTransferMethodRepository = ErrorFromMethodsOfInterface<IRepoBankAccountTransferMethod, "BankAccountTransferMethod">

export interface IRepoBankAccountTransferMethod extends IRepositoryWithDates<MBankAccountTransferMethod, BankAccountTransferMethod> {
  create(data: CreateBankAccountTransferMethodTypeParams): Result<BankAccountTransferMethod>;
  find_by_id(id: MBankAccountTransferMethod["id"]): Result<BankAccountTransferMethod>;
  find_by_bank_account_id(bank_account_id: BankAccount["id"]): Result<BankAccountTransferMethod[]>;
  find_all(): Result<BankAccountTransferMethod[]>;
  find_all_of_bank_account(bank_account_id: BankAccount["id"]): Result<BankAccountTransferMethod[]>;
  update(id: BankAccountTransferMethod["id"], data: UpdateBankAccountTransferMethodTypeParams): Result<BankAccountTransferMethod>;
  delete(id: BankAccountTransferMethod["id"]): Result<boolean>;
}