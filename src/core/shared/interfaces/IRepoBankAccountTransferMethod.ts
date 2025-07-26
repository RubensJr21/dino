import { BankAccount } from "@core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { MBankAccountTransferMethod } from "@src/core/models/bank_account_transfer_method.model";
import { Result } from "../types/Result";
import { CreateRepositoryWithDatesParams, IRepositoryWithDates, UpdateRepositoryWithDatesParams } from "./IRepositoryWithDates";

export type CreateBankAccountTransferMethodTypeParams = CreateRepositoryWithDatesParams<MBankAccountTransferMethod>
export type UpdateBankAccountTransferMethodTypeParams = UpdateRepositoryWithDatesParams<MBankAccountTransferMethod>

export interface IRepoBankAccountTransferMethod extends IRepositoryWithDates<MBankAccountTransferMethod, BankAccountTransferMethod> {
  create(data: CreateBankAccountTransferMethodTypeParams): Result<BankAccountTransferMethod>;
  findById(id: MBankAccountTransferMethod["id"]): Result<BankAccountTransferMethod>;
  findByBankAccountId(bank_account_id: BankAccount["id"]): Result<BankAccountTransferMethod[]>;
  findAll(): Result<BankAccountTransferMethod[]>;
  findAllOfBankAccount(bank_account_id: BankAccount["id"]): Result<BankAccountTransferMethod[]>;
  update(id: BankAccountTransferMethod["id"], data: UpdateBankAccountTransferMethodTypeParams): Result<BankAccountTransferMethod>;
  delete(id: BankAccountTransferMethod["id"]): Result<boolean>;
}