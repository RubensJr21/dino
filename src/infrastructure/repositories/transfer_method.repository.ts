import { MTransferMethod } from '@src/core/models/transfer_method.model'
import { CreateTransferMethodTypeParams, IRepoTransferMethod, UpdateTransferMethodTypeParams } from '@src/core/shared/interfaces/IRepoTransferMethod'
import { transfer_method_mapper } from '@src/core/shared/mappers/transfer_method'
import { transfer_method } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'
import { Transaction } from '../database/TransactionType'

// ALERT: Encapsular todas as funções com try catch
export default class TransferMethodDrizzleRepository implements IRepoTransferMethod {
  constructor(private tx: Transaction) { }
  
  public create(data: CreateTransferMethodTypeParams): ReturnType<IRepoTransferMethod["create"]> {
    const transfer_method_created = this.tx.insert(transfer_method).values(data).returning().get()

    return {
      success: true,
      data: transfer_method_mapper(transfer_method_created)
    }
  }

  public find_by_id(id: MTransferMethod["id"]): ReturnType<IRepoTransferMethod["find_by_id"]> {
    const transfer_method_searched = this.tx.query.transfer_method.findFirst({
      where: eq(transfer_method.id, id)
    }).sync()

    if (!transfer_method_searched) {
      return {
        success: false,
        error: {
          code: 'id_not_found',
          scope: "transfer_method",
          message: `Foi retornado o valor ${transfer_method_searched} na busca.`
        }
      }
    }
    return {
      success: true,
      data: transfer_method_mapper(transfer_method_searched)
    };
  }

  public find_by_method(method: MTransferMethod["method"]): ReturnType<IRepoTransferMethod["find_by_method"]> {
    const transfer_method_searched = this.tx.query.transfer_method.findFirst({
      where: eq(transfer_method.method, method)
    }).sync()

    if (!transfer_method_searched) {
      return {
        success: false,
        error: {
          code: 'description_not_found',
          scope: "transfer_method",
          message: `Foi retornado o valor ${transfer_method_searched} na busca.`
        }
      }
    }
    return {
      success: true,
      data: transfer_method_mapper(transfer_method_searched)
    };
  }

  public find_all(): ReturnType<IRepoTransferMethod["find_all"]> {
    const result = this.tx.query.transfer_method.findMany().sync()

    const transfer_methods = result.map(transfer_method_mapper)

    return {
      success: true,
      data: transfer_methods
    }
  }

  public update(id: MTransferMethod["id"], data: UpdateTransferMethodTypeParams): ReturnType<IRepoTransferMethod["update"]> {
    const result = this.tx.update(transfer_method).set(data).where(
      eq(transfer_method.id, id)
    ).returning({ id: transfer_method.id }).get()

    const transfer_method_updated = this.tx.query.transfer_method.findFirst({ where: eq(transfer_method.id, result.id) }).sync()

    if (!transfer_method_updated) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "transfer_method",
          message: "Um erro aconteceu ao obter o método de transferência atualizado."
        }
      }
    };

    return {
      success: true,
      data: transfer_method_mapper(transfer_method_updated)
    }
  }

  public delete(id: MTransferMethod["id"]): ReturnType<IRepoTransferMethod["delete"]> {
    const transfer_method_deleted = this.tx.delete(transfer_method).where(
      eq(transfer_method.id, id)
    ).returning().get();

    if (!transfer_method_deleted) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "transfer_method",
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