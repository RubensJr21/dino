import { RepoInterfaceNames } from "@core-types/enum/RepoInterfaceNames";
import { bank_account_transfer_method_mapper } from "@core-utils/mappers/bank_account_transfer_method";
import { MBankAccountTransferMethod } from "@core/models/bank_account_transfer_method.model";
import { BankAccount } from "@domain/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@domain/entities/bank_account_transfer_method.entity";
import { build_internal_repo_error_bank_account_transfer_method, CreateBankAccountTransferMethodTypeParams, IRepoBankAccountTransferMethod, UpdateBankAccountTransferMethodTypeParams } from "@domain/repositories/IRepoBankAccountTransferMethod";
import { bank_account_transfer_method } from "@server/infrastructure/database/drizzle/schemas";
import { Transaction } from "@src-types/transaction";
import { eq } from "drizzle-orm/sql";

export default class BankAccountTransferMethodDrizzleRepository implements IRepoBankAccountTransferMethod {
  constructor(private tx: Transaction) { }

  public create(data: CreateBankAccountTransferMethodTypeParams): ReturnType<IRepoBankAccountTransferMethod["create"]> {
    try {
      const { id } = this.tx.insert(bank_account_transfer_method).values({
        is_disabled: data.is_disabled ? 1 : 0,
        fk_id_bank_account: data.fk_id_bank_account,
        fk_id_transfer_method: data.fk_id_transfer_method
      }).returning({
        id: bank_account_transfer_method.id
      }).get()

      const bank_account_transfer_method_created = this.tx.query.bank_account_transfer_method.findFirst({
        where: eq(bank_account_transfer_method.id, id),
        with: {
          bank_account: true,
          transfer_method: true
        }
      }).sync()

      if (!bank_account_transfer_method_created) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Recurring,
            method: "create",
            code: 'id_not_found',
            message: "Um erro ocorreu durante a criação"
          }
        }
      }

      return {
        success: true,
        data: bank_account_transfer_method_mapper(bank_account_transfer_method_created)
      };
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account_transfer_method(
          "create",
          error as Error
        )
      }
    }
  }

  public find_by_id(id: MBankAccountTransferMethod["id"]): ReturnType<IRepoBankAccountTransferMethod["find_by_id"]> {
    try {
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
            scope: RepoInterfaceNames.BankAccountTransferMethod,
            method: "find_by_id",
            code: "id_not_found",
            message: `Foi retornado o valor ${result} na busca.`
          }
        }
      };

      return {
        success: true,
        data: bank_account_transfer_method_mapper(result)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account_transfer_method(
          "find_by_id",
          error as Error
        )
      }
    }
  }

  public find_by_bank_account_id(bank_account_id: BankAccount["id"]): ReturnType<IRepoBankAccountTransferMethod["find_by_bank_account_id"]> {
    try {
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
            scope: RepoInterfaceNames.BankAccountTransferMethod,
            method: "find_by_bank_account_id",
            code: "id_not_found",
            message: "Nenhum método de transferência foi encontrado para a conta bancária informada."
          }
        }
      }

      return {
        success: true,
        data: bankId_transfers.map(bank_account_transfer_method_mapper)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account_transfer_method(
          "find_by_bank_account_id",
          error as Error
        )
      }
    }
  }

  public find_all(): ReturnType<IRepoBankAccountTransferMethod["find_all"]> {
    try {
      const results = this.tx.query.bank_account_transfer_method.findMany({ with: { bank_account: true, transfer_method: true } }).sync()
      return {
        success: true,
        data: results.map((bank_account_transfer_method_mapper))
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account_transfer_method(
          "find_all",
          error as Error
        )
      }
    }
  }

  public find_all_of_bank_account(bank_account_id: BankAccount["id"]): ReturnType<IRepoBankAccountTransferMethod["find_all_of_bank_account"]> {
    try {
      const results = this.tx.query.bank_account_transfer_method.findMany({
        with: {
          bank_account: true,
          transfer_method: true
        },
        where: eq(bank_account_transfer_method.fk_id_bank_account, bank_account_id)
      }).sync()

      // throw new Error("Erro de teste. (find_all_of_bank_account)")

      return {
        success: true,
        data: results.map((bank_account_transfer_method_mapper))
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account_transfer_method(
          "find_all_of_bank_account",
          error as Error
        )
      }
    }
  }

  public update(id: BankAccountTransferMethod["id"], data: UpdateBankAccountTransferMethodTypeParams): ReturnType<IRepoBankAccountTransferMethod["update"]> {
    try {
      const result = this.tx.update(bank_account_transfer_method).set({
        fk_id_bank_account: data.fk_id_bank_account,
        fk_id_transfer_method: data.fk_id_transfer_method,
        is_disabled: data.is_disabled ? 1 : 0
      }).where(eq(bank_account_transfer_method.id, id)).returning().get()
      
      const bank_account_transfer_method_updated = this.tx.query.bank_account_transfer_method.findFirst({
        with: {
          bank_account: true,
          transfer_method: true
        },
        where: eq(bank_account_transfer_method.id, result.id)
      }).sync()

      if (!bank_account_transfer_method_updated) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.BankAccountTransferMethod,
            method: "update",
            code: "id_not_found",
            message: "Um erro ocorreu durante a atualização."
          }
        }
      };

      return {
        success: true,
        data: bank_account_transfer_method_mapper(bank_account_transfer_method_updated)
      }
    } catch (error) {
      console.error(error)
      return {
        success: false,
        error: build_internal_repo_error_bank_account_transfer_method(
          "update",
          error as Error
        )
      }
    }
  }

  public delete(id: BankAccountTransferMethod["id"]): ReturnType<IRepoBankAccountTransferMethod["delete"]> {
    try {
      const result = this.tx.delete(bank_account_transfer_method).where(eq(bank_account_transfer_method.id, id)).returning().get()

      if (!result) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.BankAccountTransferMethod,
            method: "delete",
            code: "id_not_found",
            message: "Ocorreu um erro ao deletar o método de transferência."
          }
        }
      }

      return {
        success: true,
        data: true
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account_transfer_method(
          "delete",
          error as Error
        )
      }
    }
  }
}