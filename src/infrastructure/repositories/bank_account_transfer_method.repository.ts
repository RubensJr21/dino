import { BankAccount } from "@core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@src/core/entities/bank_account_transfer_method.entity";
import { MBankAccountTransferMethod } from "@src/core/models/bank_account_transfer_method.model";
import { CreateBankAccountTransferMethodTypeParams, IRepoBankAccountTransferMethod, UpdateBankAccountTransferMethodTypeParams } from "@src/core/shared/interfaces/IRepoBankAccountTransferMethod";
import { bank_account_transfer_method_mapper } from "@src/core/shared/mappers/bank_account_transfer_method";
import { db } from "@src/infrastructure/database/client";
import { bank_account_transfer_method } from "@src/infrastructure/database/schemas";
import { eq } from "drizzle-orm/sql";
import { Transaction } from "../database/TransactionType";

export default class BankAccountTransferMethodDrizzleRepository implements IRepoBankAccountTransferMethod {
  constructor(private tx: Transaction) { }

  public create(data: CreateBankAccountTransferMethodTypeParams): ReturnType<IRepoBankAccountTransferMethod["create"]> {
    const result = this.tx.insert(bank_account_transfer_method).values(data).returning({
      id: bank_account_transfer_method.id
    }).get()
    return this.find_by_id(result.id);
  }

  public find_by_id(id: MBankAccountTransferMethod["id"]): ReturnType<IRepoBankAccountTransferMethod["find_by_id"]> {
    const result = this.tx.query.bank_account_transfer_method.findFirst({
      where: eq(bank_account_transfer_method.id, id),
      with: {
        bank_account: true,
        transfer_method: true
      }
    }).sync()

    if (!result) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "bank_account_transfer_method",
          message: `Foi retornado o valor ${result} na busca.`
        }
      }
    };

    return {
      success: true,
      data: bank_account_transfer_method_mapper(result)
    }
  }

  public find_by_bank_account_id(bank_account_id: BankAccount["id"]): ReturnType<IRepoBankAccountTransferMethod["find_by_bank_account_id"]> {
    const bankId_transfers = this.tx.query.bank_account_transfer_method.findMany({
      where: eq(bank_account_transfer_method.fk_id_bank_account, bank_account_id),
      with: {
        bank_account: true,
        transfer_method: true
      }
    }).sync()

    if (bankId_transfers.length === 0) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "bank_account_transfer_method",
          message: "Nenhum método de transferência foi encontrado para a conta bancária informada."
        }
      }
    }

    return {
      success: true,
      data: bankId_transfers.map(bank_account_transfer_method_mapper)
    }
  }

  public find_all(): ReturnType<IRepoBankAccountTransferMethod["find_all"]> {
    const results = this.tx.query.bank_account_transfer_method.findMany({ with: { bank_account: true, transfer_method: true } }).sync()
    return {
      success: true,
      data: results.map((bank_account_transfer_method_mapper))
    }
  }

  public find_all_of_bank_account(bank_account_id: BankAccount["id"]): ReturnType<IRepoBankAccountTransferMethod["find_all_of_bank_account"]> {
    const results = this.tx.query.bank_account_transfer_method.findMany({
      with: {
        bank_account: true,
        transfer_method: true
      },
      where: eq(bank_account_transfer_method.fk_id_bank_account, bank_account_id) }).sync()
    return {
      success: true,
      data: results.map((bank_account_transfer_method_mapper))
    }
  }

  public update(id: BankAccountTransferMethod["id"], data: UpdateBankAccountTransferMethodTypeParams): ReturnType<IRepoBankAccountTransferMethod["update"]> {
    const result = db.update(bank_account_transfer_method).set(data).where(eq(bank_account_transfer_method.id, id)).returning().get()

    const bank_account_transfer_method_updated = this.tx.query.bank_account_transfer_method.findFirst({ with: { bank_account: true, transfer_method: true }, where: eq(bank_account_transfer_method.id, result.id) }).sync()

    if (!bank_account_transfer_method_updated) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "bank_account_transfer_method",
          message: "Um erro ocorreu durante a atualização."
        }
      }
    };

    return {
      success: true,
      data: bank_account_transfer_method_mapper(bank_account_transfer_method_updated)
    }
  }

  public delete(id: BankAccountTransferMethod["id"]): ReturnType<IRepoBankAccountTransferMethod["delete"]> {
    const result = this.tx.delete(bank_account_transfer_method).where(eq(bank_account_transfer_method.id, id)).returning().get()

    if(!result) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "bank_account_transfer_method",
          message: "Ocorreu um erro ao deletar o método de transferência."
        }
      }
    }

    return {
      success: true,
      data: true
    }
  }
}