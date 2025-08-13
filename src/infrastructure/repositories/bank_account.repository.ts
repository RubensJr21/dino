import { MBankAccount } from "@src/core/models/bank_account.model";
import { build_internal_repo_error_bank_account, CreateBankAccountParams, IRepoBankAccount, UpdateBankAccountParams } from "@src/core/shared/interfaces/IRepoBankAccount";
import { bank_account_mapper } from "@src/core/shared/mappers/bank_account";
import { RepoInterfaceNames } from "@src/core/shared/types/RepoInterfaceNames";
import { bank_account } from "@src/infrastructure/database/schemas";
import { eq } from "drizzle-orm/sql";
import { Transaction } from "../database/Transaction";

export default class BankAccountDrizzleRepository implements IRepoBankAccount {
  constructor(private tx: Transaction) { }

  public create(data: CreateBankAccountParams): ReturnType<IRepoBankAccount["create"]> {
    try {
      const result = this.tx.insert(bank_account).values({
        nickname: data.nickname,
        balance: data.balance,
        is_disabled: data.is_disabled
      }).returning().get()

      const bank_account_created = this.tx.query.bank_account.findFirst({
        where: eq(bank_account.id, result.id)
      }).sync()

      if (!bank_account_created) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.BankAccount,
            method: "create",
            code: "id_not_found",
            message: "Um erro ocorreu ao inserir a conta bancária."
          }
        }
      }

      return {
        success: true,
        data: bank_account_mapper(result)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account(
          "create",
          error as Error
        )
      }
    }
  }

  public find_by_id(id: MBankAccount["id"]): ReturnType<IRepoBankAccount["find_by_id"]> {
    try {
      const result = this.tx.query.bank_account.findFirst({
        where: eq(bank_account.id, id)
      }).sync()
  
      if (!result) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.BankAccount,
            method: "find_by_id",
            code: "id_not_found",
            message: `Foi retornado o valor ${result} na busca.`
          }
        }
      }
  
      return {
        success: true,
        data: bank_account_mapper(result)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account(
          "find_by_id",
          error as Error
        )
      }
    }
  }

  public find_by_nickname(nickname: MBankAccount["nickname"]): ReturnType<IRepoBankAccount["find_by_nickname"]> {
    try {
      const result = this.tx.query.bank_account.findFirst({ where: eq(bank_account.nickname, nickname) }).sync()
      if (!result) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.BankAccount,
            method: "find_by_nickname",
            code: "nickname_not_found",
            message: `A conta com o apelido ${nickname} não foi encontrada.`
          }
        }
      }
      return {
        success: true,
        data: bank_account_mapper(result)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account(
          "find_by_nickname",
          error as Error
        )
      }
    }
  }

  public find_all(): ReturnType<IRepoBankAccount["find_all"]> {
    try {
      const results = this.tx.query.bank_account.findMany().sync()
      return {
        success: true,
        data: results.map(bank_account_mapper)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account(
          "find_all",
          error as Error
        )
      }
    }
  }

  public update(id: MBankAccount["id"], data: UpdateBankAccountParams): ReturnType<IRepoBankAccount["update"]> {
    try {
      const result = this.tx.update(bank_account).set(data).where(
        eq(bank_account.id, id)
      ).returning({ id: bank_account.id }).get()
  
      const bank_account_updated = this.tx.query.bank_account.findFirst({ with: { recurrence_type: true }, where: eq(bank_account.id, result.id) }).sync()
  
      if (!bank_account_updated) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.BankAccount,
            method: "update",
            code: "id_not_found",
            message: "Um erro ocorreu durante a atualização."
          }
        }
      };
  
      return {
        success: true,
        data: bank_account_mapper(bank_account_updated)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_bank_account(
          "update",
          error as Error
        )
      }
    }
  }

  public delete(id: MBankAccount["id"]): ReturnType<IRepoBankAccount["delete"]> {
    try {
      const result = this.tx.delete(bank_account).where(
        eq(bank_account.id, id)
      ).returning().get()
  
      if (!result) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.BankAccount,
            method: "delete",
            code: "id_not_found",
            message: "Ocorreu um erro ao deletar a conta bancária."
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
        error: build_internal_repo_error_bank_account(
          "update",
          error as Error
        )
      }
    }
  }
}