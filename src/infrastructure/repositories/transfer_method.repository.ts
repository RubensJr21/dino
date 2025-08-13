import { MTransferMethod } from '@src/core/models/transfer_method.model'
import { build_internal_repo_error_transfer_method, CreateTransferMethodTypeParams, IRepoTransferMethod, UpdateTransferMethodTypeParams } from '@src/core/shared/interfaces/IRepoTransferMethod'
import { transfer_method_mapper } from '@src/core/shared/mappers/transfer_method'
import { RepoInterfaceNames } from '@src/core/shared/types/RepoInterfaceNames'
import { transfer_method } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'
import { Transaction } from '../database/Transaction'

export default class TransferMethodDrizzleRepository implements IRepoTransferMethod {
  constructor(private tx: Transaction) { }

  public create(data: CreateTransferMethodTypeParams): ReturnType<IRepoTransferMethod["create"]> {
    try {
      const transfer_method_created = this.tx.insert(transfer_method).values(data).returning().get()

      return {
        success: true,
        data: transfer_method_mapper(transfer_method_created)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_transfer_method(
          "create",
          error as Error
        )
      }
    }
  }

  public find_by_id(id: MTransferMethod["id"]): ReturnType<IRepoTransferMethod["find_by_id"]> {
    try {
      const transfer_method_searched = this.tx.query.transfer_method.findFirst({
        where: eq(transfer_method.id, id)
      }).sync()

      if (!transfer_method_searched) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.TransferMethod,
            method: "find_by_id",
            code: 'id_not_found',
            message: `Foi retornado o valor ${transfer_method_searched} na busca.`
          }
        }
      }
      return {
        success: true,
        data: transfer_method_mapper(transfer_method_searched)
      };
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_transfer_method(
          "find_by_id",
          error as Error
        )
      }
    }
  }

  public find_by_method(method: MTransferMethod["method"]): ReturnType<IRepoTransferMethod["find_by_method"]> {
    try {
      const transfer_method_searched = this.tx.query.transfer_method.findFirst({
        where: eq(transfer_method.method, method)
      }).sync()

      if (!transfer_method_searched) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.TransferMethod,
            method: "find_by_method",
            code: 'description_not_found',
            message: `Foi retornado o valor ${transfer_method_searched} na busca.`
          }
        }
      }
      return {
        success: true,
        data: transfer_method_mapper(transfer_method_searched)
      };
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_transfer_method(
          "find_by_method",
          error as Error
        )
      }
    }
  }

  public find_all(): ReturnType<IRepoTransferMethod["find_all"]> {
    try {
      const result = this.tx.query.transfer_method.findMany().sync()

      const transfer_methods = result.map(transfer_method_mapper)

      return {
        success: true,
        data: transfer_methods
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_transfer_method(
          "find_all",
          error as Error
        )
      }
    }
  }

  public update(id: MTransferMethod["id"], data: UpdateTransferMethodTypeParams): ReturnType<IRepoTransferMethod["update"]> {
    try {
      const result = this.tx.update(transfer_method).set(data).where(
        eq(transfer_method.id, id)
      ).returning({ id: transfer_method.id }).get()

      const transfer_method_updated = this.tx.query.transfer_method.findFirst({ where: eq(transfer_method.id, result.id) }).sync()

      if (!transfer_method_updated) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.TransferMethod,
            method: "update",
            code: "id_not_found",
            message: "Um erro aconteceu ao obter o método de transferência atualizado."
          }
        }
      };

      return {
        success: true,
        data: transfer_method_mapper(transfer_method_updated)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_transfer_method(
          "update",
          error as Error
        )
      }
    }
  }

  public delete(id: MTransferMethod["id"]): ReturnType<IRepoTransferMethod["delete"]> {
    try {
      const transfer_method_deleted = this.tx.delete(transfer_method).where(
        eq(transfer_method.id, id)
      ).returning().get();

      if (!transfer_method_deleted) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.TransferMethod,
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
        error: build_internal_repo_error_transfer_method(
          "delete",
          error as Error
        )
      }
    }
  }
}