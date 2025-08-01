import { ItemValue } from '@src/core/entities/item_value.entity'
import { MItemValue } from '@src/core/models/item_value.model'
import { MRecurring } from '@src/core/models/recurring.model'
import { CreateRecurringParams, IRepoRecurring, UpdateRecurringParams } from '@src/core/shared/interfaces/IRepoRecurring'
import { item_value_mapper } from '@src/core/shared/mappers/item_value'
import { recurring_mapper } from '@src/core/shared/mappers/recurring'
import { item_value, recurrence_type, recurring, recurring_item_value, tag, transfer_method } from '@src/infrastructure/database/schemas'
import { and, eq } from 'drizzle-orm/sql'
import { Transaction } from '../database/TransactionType'

// ALERT: Encapsular todas as funções com try catch
export default class RecurringDrizzleRepository implements IRepoRecurring {
  constructor(private tx: Transaction) { }

  public create({
    is_disabled,
    start_date,
    end_date,
    current_amount,
    fk_id_tag,
    fk_id_transfer_method,
    fk_id_recurrence_type,
  }: CreateRecurringParams): ReturnType<IRepoRecurring["create"]> {
    console.log("Dentro do Repositório do Drizzle")
    
    try {
      // Registra Recurring
      const { id } = this.tx.insert(recurring).values({
        is_disabled,
        start_date,
        end_date,
        current_amount,
        fk_id_tag,
        fk_id_transfer_method,
        fk_id_recurrence_type,
      }).returning({ id: recurring.id }).get()
      console.log("Depois do insert")
      console.log(id)
  
      const recurring_created = this.tx.query.recurring.findFirst({
        with: {
          tag: true,
          transfer_method: true,
          recurrence_type: true
        },
        where: eq(recurring.id, id)
      }).sync()
  
      if (!recurring_created) {
        return {
          success: false,
          error: {
            code: 'id_not_found',
            scope: "recurring",
            message: "Um erro ocorreu durante a criação"
          }
        }
      }
  
      return {
        success: true,
        data: recurring_mapper(recurring_created)
      }
    } catch (e) {
      const error = e as Error
      console.error(error)
      return {
        success: false,
        error: {
          code: "internal_repo_error_Recurring(#create)",
          scope: "RecurringDrizzleRepository(#create)",
          message: `O Erro Crítico (message = ${error.message}, cause = ${error.cause})`
        }
      }
    }
    
  }

  public registerNextRecurring(id: MRecurring["id"], item_value_id: ItemValue["id"]): ReturnType<IRepoRecurring["registerNextRecurring"]> {
    const result = this.tx.insert(recurring_item_value).values({
      fk_id_recurring: id,
      fk_id_item_value: item_value_id,
    }).returning({ id: recurring_item_value.id }).get()

    const recurring_item_value_created = this.tx.query.recurring_item_value.findFirst({
      where: eq(recurring.id, result.id)
    }).sync()

    if (!recurring_item_value_created) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "recurring > recurring_item_value",
          message: "O item pode não ter sido cadastrado ainda."
        }
      }
    }
    return {
      success: true,
      data: true
    }
  }

  public find_by_id(id: MRecurring["id"]): ReturnType<IRepoRecurring["find_by_id"]> {
    const result = this.tx.query.recurring.findFirst({
      where: eq(recurring.id, id),
      with: {
        tag: true,
        transfer_method: true,
        recurrence_type: true
      }
    }).sync()

    if (!result) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "recurring",
          message: `Foi retornado o valor ${result} na busca.`
        }
      }
    }

    const recurring_founded = recurring_mapper(result)

    return {
      success: true,
      data: recurring_founded
    }
  }

  public find_item_value(recurring_id: MRecurring["id"], item_value_id: MItemValue["id"]): ReturnType<IRepoRecurring["find_item_value"]> {
    const result = this.tx.query.recurring_item_value.findFirst({
      with: {
        item_value: {
          with: {
            tag: true,
            transfer_method: true
          }
        }
      },
      where: and(
        eq(recurring_item_value.fk_id_recurring, recurring_id),
        eq(recurring_item_value.fk_id_item_value, item_value_id),
      )
    }).sync()

    if (!result) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "recurring > recurring_item_value",
          message: `Foi retornado o valor ${result} na busca.`
        }
      }
    }

    return {
      success: true,
      data: item_value_mapper(result.item_value)
    }
  }

  public find_all(): ReturnType<IRepoRecurring["find_all"]> {
    const result = this.tx.query.recurring.findMany({
      with: {
        tag: true,
        transfer_method: true,
        recurrence_type: true
      },
    }).sync()

    const recurrings = result.map(recurring_mapper)

    return {
      success: true,
      data: recurrings
    }
  }

  find_all_item_value(recurring_id: MRecurring['id']): ReturnType<IRepoRecurring["find_all_item_value"]> {
    try {
      const result = this.tx.query.recurring_item_value.findMany({
        with: {
          item_value: {
            with: {
              tag: true,
              transfer_method: true
            }
          }
        },
        where: and(
          eq(recurring_item_value.fk_id_recurring, recurring_id),
        )
      }).sync()
  
      return {
        success: true,
        data: result.map(recurring => item_value_mapper(recurring.item_value))
      }
    } catch (e) {
      const error = e as Error
      console.error(error)
      return {
        success: false,
        error: {
          code: "internal_repo_error_Recurring(#find_all_item_value)",
          scope: "RecurringDrizzleRepository(#find_all_item_value)",
          message: `O Erro Crítico (message = ${error.message}, cause = ${error.cause})`
        }
      }
    }
  }

  public find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): ReturnType<IRepoRecurring["find_all_by_cashflow_type"]> {
    try {
      const result = this.tx.select({
        id: recurring.id,
        is_disabled: recurring.is_disabled,
        start_date: recurring.start_date,
        end_date: recurring.end_date,
        current_amount: recurring.current_amount,
        tag: {
          id: tag.id,
          description: tag.description
        },
        transfer_method: {
          id: transfer_method.id,
          method: transfer_method.method
        },
        recurrence_type: {
          id: recurrence_type.id,
          type: recurrence_type.type
        },
        created_at: recurring.created_at,
        updated_at: recurring.updated_at,
      })
        .from(recurring_item_value)
        .innerJoin(recurring, eq(recurring.id, recurring_item_value.fk_id_recurring))
        .innerJoin(recurrence_type, eq(recurrence_type.id, recurring.fk_id_recurrence_type))
        .innerJoin(item_value, eq(item_value.id, recurring_item_value.fk_id_item_value))
        .innerJoin(tag, eq(tag.id, item_value.fk_id_tag))
        .innerJoin(transfer_method, eq(transfer_method.id, item_value.fk_id_transfer_method))
        .where(eq(item_value.cashflow_type, cashflow_type))
        .all()
  
      const recurrings = result.map(recurring_mapper)
  
      return {
        success: true,
        data: recurrings
      }
    } catch (e) {
      const error = e as Error
      console.error(error)
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "RecurringDrizzleRepository(#create)",
          message: `O Erro Crítico ${error.message}`
        }
      }
    }
  }

  public update(id: MRecurring["id"], data: UpdateRecurringParams): ReturnType<IRepoRecurring["update"]> {
    const result = this.tx.update(recurring).set(data)
      .where(eq(recurring_item_value.id, id))
      .returning({ id: recurring_item_value.id })
      .get()

    const recurring_updated = this.tx.query.recurring.findFirst({
      with: {
        tag: true,
        transfer_method: true,
        recurrence_type: true
      },
      where: eq(recurring.id, result.id)
    }).sync()

    if (!recurring_updated) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "recurring",
          message: "Um erro aconteceu ao obter a recorrência atualizada."
        }
      }
    }

    return {
      success: true,
      data: recurring_mapper(recurring_updated)
    }
  }

  public delete(id: MRecurring["id"]): ReturnType<IRepoRecurring["delete"]> {
    // Usando o onDelete com modo cascade basta apagar o pai e todos os outros serão apagados
    const recurring_deleted = this.tx.delete(recurring).where(eq(recurring.id, id)).returning().get()

    if (!recurring_deleted) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "recurring",
          message: "Ocorreu um erro ao deletar a recorrência."
        }
      }
    }

    return {
      success: true,
      data: true
    }
  }
}