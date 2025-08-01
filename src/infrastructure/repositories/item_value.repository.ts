import { MItemValue } from '@src/core/models/item_value.model'
import { CreateItemValueParams, IRepoItemValue, UpdateItemValueParams } from '@src/core/shared/interfaces/IRepoItemValue'
import { item_value_mapper } from '@src/core/shared/mappers/item_value'
import { item_value } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'
import { Transaction } from '../database/TransactionType'

// ALERT: Encapsular todas as funções com try catch
export default class ItemValueDrizzleRepository implements IRepoItemValue {
  constructor(private tx: Transaction) { }
  
  public create(data: CreateItemValueParams): ReturnType<IRepoItemValue["create"]> {
    const { id } = this.tx.insert(item_value).values(data).returning({ id: item_value.id }).get()

    const item_value_created = this.tx.query.item_value.findFirst({
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
          code: "id_not_found",
          scope: "item_value",
          message: "Um erro ocorreu durante a criação"
        }
      }
    }

    return {
      success: true,
      data: item_value_mapper(item_value_created)
    }
  }

  public find_by_id(id: MItemValue["id"]): ReturnType<IRepoItemValue["find_by_id"]> {
    const result = this.tx.query.item_value.findFirst({
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
          code: "id_not_found",
          scope: "item_value",
          message: `Foi retornado o valor ${result} na busca.`
        }
      }
    }

    return {
      success: true,
      data: item_value_mapper(result)
    }
  }

  public find_all(): ReturnType<IRepoItemValue["find_all"]> {
    const results = this.tx.query.item_value.findMany({
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
  }

  public update(id: MItemValue["id"], data: UpdateItemValueParams): ReturnType<IRepoItemValue["update"]> {
    const result = this.tx.update(item_value).set(data).where(eq(item_value.id, id)).returning({ id: item_value.id }).get()

    const item_value_updated = this.tx.query.item_value.findFirst({
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
          code: "id_not_found",
          scope: "item_value",
          message: "Um erro aconteceu ao obter o item valor atualizado."
        }
      }
    }

    return {
      success: true,
      data: item_value_mapper(item_value_updated)
    }
  }

  public delete(id: MItemValue["id"]): ReturnType<IRepoItemValue["delete"]> {
    const item_value_deleted = this.tx.delete(item_value).where(eq(item_value.id, id)).returning().get();
    
    if (!item_value_deleted) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "item_value",
          message: "Ocorreu um erro ao deletar o item valor."
        }
      }
    }

    return {
      success: true,
      data: true
    }
  }
}