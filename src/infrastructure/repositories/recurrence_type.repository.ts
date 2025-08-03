import { MRecurrenceType } from '@src/core/models/recurrence_type.model'
import { build_internal_repo_error_recurrence_type, CreateRecurrenceTypeParams, IRepoRecurrenceType, UpdateRecurrenceTypeParams } from '@src/core/shared/interfaces/IRepoRecurrenceType'
import { recurrence_type_mapper } from '@src/core/shared/mappers/recurrence_type'
import { RepoInterfaceNames } from '@src/core/shared/types/RepoInterfaceNames'
import { recurrence_type } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'
import { Transaction } from '../database/TransactionType'

export default class RecurrenceTypeDrizzleRepository implements IRepoRecurrenceType {
  constructor(private tx: Transaction) { }

  public create(data: CreateRecurrenceTypeParams): ReturnType<IRepoRecurrenceType["create"]> {
    try {
      const { id } = this.tx.insert(recurrence_type).values(data).returning().get()

      const recurrence_type_created = this.tx.query.recurrence_type.findFirst({
        with: {
          item_value: {
            with: {
              tag: true,
              transfer_method: true
            }
          }
        },
        where: eq(recurrence_type.id, id)
      }).sync()

      if (!recurrence_type_created) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.RecurrenceType,
            method: "create",
            code: 'id_not_found',
            message: "Um erro ocorreu durante a criação"
          }
        }
      }

      return {
        success: true,
        data: recurrence_type_mapper(recurrence_type_created)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_recurrence_type(
          "create",
          error as Error
        )
      }
    }
  }

  public find_by_id(id: MRecurrenceType["id"]): ReturnType<IRepoRecurrenceType["find_by_id"]> {
    try {
      const recurrence_type_searched = this.tx.query.recurrence_type.findFirst({
        where: eq(recurrence_type.id, id)
      }).sync()
  
      if (!recurrence_type_searched) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.RecurrenceType,
            method: "find_by_id",
            code: 'id_not_found',
            message: `Foi retornado o valor ${recurrence_type_searched} na busca.`
          }
        }
      }
  
      return {
        success: true,
        data: recurrence_type_mapper(recurrence_type_searched)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_recurrence_type(
          "find_by_id",
          error as Error
        )
      }
    }
  }

  public find_by_type(type: MRecurrenceType["type"]): ReturnType<IRepoRecurrenceType["find_by_type"]> {
    try {
      const recurrence_type_searched = this.tx.query.recurrence_type.findFirst({
        where: eq(recurrence_type.type, type)
      }).sync()
  
      if (!recurrence_type_searched) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.RecurrenceType,
            method: "find_by_type",
            code: "type_not_found",
            message: `Foi retornado o valor ${recurrence_type_searched} na busca.`
          }
        }
      }
  
      return {
        success: true,
        data: recurrence_type_mapper(recurrence_type_searched)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_recurrence_type(
          "find_by_type",
          error as Error
        )
      }
    }
  }

  public find_all(): ReturnType<IRepoRecurrenceType["find_all"]> {
    try {
      const result = this.tx.query.recurrence_type.findMany().sync()
  
      const recurrences_type = result.map(recurrence_type_mapper)
  
      return {
        success: true,
        data: recurrences_type
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_recurrence_type(
          "find_all",
          error as Error
        )
      }
    }
  }

  public update(id: MRecurrenceType["id"], data: UpdateRecurrenceTypeParams): ReturnType<IRepoRecurrenceType["update"]> {
    try {
      const result = this.tx.update(recurrence_type).set(data).where(
        eq(recurrence_type.id, id)
      ).returning().get()
  
      const recurrence_type_updated = this.tx.query.recurrence_type.findFirst({ where: eq(recurrence_type.id, result.id) }).sync()
  
      if (!recurrence_type_updated) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.RecurrenceType,
            method: "update",
            code: "id_not_found",
            message: "Um erro aconteceu ao obter o tipo de recorrência atualizado."
          }
        }
      };
  
      return {
        success: true,
        data: recurrence_type_mapper(recurrence_type_updated)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_recurrence_type(
          "update",
          error as Error
        )
      }
    }
  }

  public delete(id: MRecurrenceType["id"]): ReturnType<IRepoRecurrenceType["delete"]> {
    try {
      const recurrence_type_deleted = this.tx.delete(recurrence_type).where(
        eq(recurrence_type.id, id)
      ).returning().get();
  
      if (!recurrence_type_deleted) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.RecurrenceType,
            method: "delete",
            code: "id_not_found",
            message: "Ocorreu um erro ao deletar o tipo de recorrência."
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
        error: build_internal_repo_error_recurrence_type(
          "delete",
          error as Error
        )
      }
    }
  }
}