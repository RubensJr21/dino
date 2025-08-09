import { MItemValue } from '@src/core/models/item_value.model'
import { build_internal_repo_error_item_value, CreateItemValueParams, IRepoItemValue, UpdateItemValueParams } from '@src/core/shared/interfaces/IRepoItemValue'
import { item_value_mapper } from '@src/core/shared/mappers/item_value'
import { RepoInterfaceNames } from '@src/core/shared/types/RepoInterfaceNames'
import { item_value } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'
import { db } from '../database/client'

export default class ItemValueDrizzleRepository implements IRepoItemValue {
  constructor() { }

  public create(data: CreateItemValueParams): ReturnType<IRepoItemValue["create"]> {
    try {
      const { id } = db.insert(item_value).values({
        description: data.description,
        cashflow_type: data.cashflow_type,
        scheduled_at: data.scheduled_at,
        amount: data.amount,
        was_processed: data.was_processed,
        fk_id_tag: data.tag.id,
        fk_id_transfer_method: data.transfer_method.id,
      }).returning({ id: item_value.id }).get()

      const item_value_created = db.query.item_value.findFirst({
        with: {
          tag: true,
          transfer_method: true
        },
        where: eq(item_value.id, id)
      }).sync()

      if (!item_value_created) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.ItemValue,
            method: "create",
            code: "id_not_found",
            message: "Um erro ocorreu durante a criação"
          }
        }
      }

      return {
        success: true,
        data: item_value_mapper(item_value_created)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_item_value(
          "create",
          error as Error
        )
      }
    }
  }

  public find_by_id(id: MItemValue["id"]): ReturnType<IRepoItemValue["find_by_id"]> {
    try {
      const result = db.query.item_value.findFirst({
        where: eq(item_value.id, id),
        with: {
          transfer_method: true,
          tag: true
        }
      }).sync()
  
      if (!result) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.ItemValue,
            method: "find_by_id",
            code: "id_not_found",
            message: `Foi retornado o valor ${result} na busca.`
          }
        }
      }
  
      return {
        success: true,
        data: item_value_mapper(result)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_item_value(
          "find_by_id",
          error as Error
        )
      }
    }
  }

  public find_all(): ReturnType<IRepoItemValue["find_all"]> {
    try {
      const results = db.query.item_value.findMany({
        with: {
          tag: true,
          transfer_method: true
        }
      }).sync()
  
      const items_value = results.map(item_value_mapper)
  
      return {
        success: true,
        data: items_value
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_item_value(
          "find_all",
          error as Error
        )
      }
    }
  }

  public update(id: MItemValue["id"], data: UpdateItemValueParams): ReturnType<IRepoItemValue["update"]> {
    try {
      const result = db.update(item_value).set(data).where(eq(item_value.id, id)).returning({ id: item_value.id }).get()
  
      const item_value_updated = db.query.item_value.findFirst({
        with: {
          tag: true,
          transfer_method: true
        },
        where: eq(item_value.id, result.id)
      }).sync()
  
      if (!item_value_updated) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.ItemValue,
            method: "update",
            code: "id_not_found",
            message: "Um erro aconteceu ao obter o item valor atualizado."
          }
        }
      }
  
      return {
        success: true,
        data: item_value_mapper(item_value_updated)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_item_value(
          "update",
          error as Error
        )
      }
    }
  }

  public delete(id: MItemValue["id"]): ReturnType<IRepoItemValue["delete"]> {
    try {
      const item_value_deleted = db.delete(item_value).where(eq(item_value.id, id)).returning().get();
  
      if (!item_value_deleted) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.ItemValue,
            method: "delete",
            code: "id_not_found",
            message: "Ocorreu um erro ao deletar o item valor."
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
        error: build_internal_repo_error_item_value(
          "update",
          error as Error
        )
      }
    }
  }
}