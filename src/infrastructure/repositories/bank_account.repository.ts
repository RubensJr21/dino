import { MBankAccount } from "@src/core/models/bank_account.model";
import { CreateBankAccountParams, IRepoBankAccount, UpdateBankAccountParams } from "@src/core/shared/interfaces/IRepoBankAccount";
import { bank_account_mapper } from "@src/core/shared/mappers/bank_account";
import { bank_account } from "@src/infrastructure/database/schemas";
import { eq } from "drizzle-orm/sql";
import { Transaction } from "../database/TransactionType";

// ALERT: Encapsular todas as funções com try catch
export default class BankAccountDrizzleRepository implements IRepoBankAccount {
  constructor(private tx: Transaction){}
  
  public create(data: CreateBankAccountParams): ReturnType<IRepoBankAccount["create"]> {
    const result = this.tx.insert(bank_account).values(data).returning().get()

    const bank_account_created = this.tx.query.bank_account.findFirst({ with: { recurrence_type: true }, where: eq(bank_account.id, result.id) }).sync()

    if(bank_account_created) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "bank_account",
          message: "Um erro ocorreu ao inserir a conta bancária."
        }
      }
    }

    return {
      success: true,
      data: bank_account_mapper(result)
    }
  }

  public find_by_id(id: MBankAccount["id"]): ReturnType<IRepoBankAccount["find_by_id"]> {
    const result = this.tx.query.bank_account.findFirst({
      where: eq(bank_account.id, id)
    }).sync()

    if(!result) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "bank_account",
          message: `Foi retornado o valor ${result} na busca.`
        }
      }
    }

    return {
      success: true,
      data: bank_account_mapper(result)
    }
  }

  public find_by_nickname(nickname: MBankAccount["nickname"]): ReturnType<IRepoBankAccount["find_by_nickname"]> {
    const result = this.tx.query.bank_account.findFirst({where: eq(bank_account.nickname, nickname)}).sync()
    if(!result) {
      return {
        success: false,
        error: {
          code: "nickname_not_found",
          scope: "bank_account",
          message: `A conta com o apelido ${nickname} não foi encontrada.`
        }
      }
    }
    return {
      success: true,
      data: bank_account_mapper(result)
    }
  }

  public find_all(): ReturnType<IRepoBankAccount["find_all"]> {
    const results = this.tx.query.bank_account.findMany().sync()
    return {
      success: true,
      data: results.map(bank_account_mapper) 
    }
  }

  public update(id: MBankAccount["id"], data: UpdateBankAccountParams): ReturnType<IRepoBankAccount["update"]> {
    const result = this.tx.update(bank_account).set(data).where(
      eq(bank_account.id, id)
    ).returning({ id: bank_account.id }).get()

    const bank_account_updated = this.tx.query.bank_account.findFirst({ with: { recurrence_type: true }, where: eq(bank_account.id, result.id) }).sync()

    if(!bank_account_updated) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "bank_account",
          message: "Um erro ocorreu durante a atualização."
        }
      }
    };

    return {
      success: true,
      data: bank_account_mapper(bank_account_updated)
    }
  }
  
  public delete(id: MBankAccount["id"]): ReturnType<IRepoBankAccount["delete"]> {
    const result = this.tx.delete(bank_account).where(
      eq(bank_account.id, id)
    ).returning().get()

    if(!result) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "bank_account",
          message: "Ocorreu um erro ao deletar a conta bancária."
        }
      }
    }

    return {
      success: true,
      data: true
    }
  }
}