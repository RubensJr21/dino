import { RepoInterfaceNames } from '@core-types/enum/RepoInterfaceNames'
import { item_value_mapper } from '@core-utils/mappers/item_value'
import { recurring_mapper } from '@core-utils/mappers/recurring'
import { MItemValue } from '@core/models/item_value.model'
import { MRecurring } from '@core/models/recurring.model'
import { ItemValue } from '@domain/entities/item_value.entity'
import { build_internal_repo_error_recurring, CreateRecurringParams, IRepoRecurring, UpdateRecurringParams } from '@domain/repositories/IRepoRecurring'
import { db } from '@server/infrastructure/database/drizzle/client'
import { item_value, recurrence_type, recurring, recurring_item_value, tag, transfer_method } from '@server/infrastructure/database/drizzle/schemas'
import { Transaction } from '@src-types/transaction'
import { and, eq } from 'drizzle-orm/sql'

export default class RecurringDrizzleRepository implements IRepoRecurring {
  constructor(private tx: Transaction) { }

  public create({
    description,
    is_disabled,
    start_date,
    current_amount,
    tag,
    transfer_method,
    recurrence_type,
  }: CreateRecurringParams): ReturnType<IRepoRecurring["create"]> {
    try {
      // Registra Recurring
      const { id } = db.insert(recurring).values({
        description,
        is_disabled: is_disabled ? 1 : 0,
        start_date,
        current_amount,
        fk_id_tag: tag.id,
        fk_id_transfer_method: transfer_method.id,
        fk_id_recurrence_type: recurrence_type.id,
      }).returning({ id: recurring.id }).get()

      const recurring_created = db.query.recurring.findFirst({
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
            scope: RepoInterfaceNames.Recurring,
            method: "create",
            code: 'id_not_found',
            message: "Um erro ocorreu durante a criação"
          }
        }
      }

      return {
        success: true,
        data: recurring_mapper(recurring_created)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_recurring(
          "create",
          error as Error
        )
      }
    }
  }

  public register_next_recurring(id: MRecurring["id"], item_value_id: ItemValue["id"]): ReturnType<IRepoRecurring["register_next_recurring"]> {
    const result = db.insert(recurring_item_value).values({
      fk_id_recurring: id,
      fk_id_item_value: item_value_id,
    }).returning({ id: recurring_item_value.id }).get()

    const recurring_item_value_created = db.query.recurring_item_value.findFirst({
      where: eq(recurring.id, result.id)
    }).sync()

    if (!recurring_item_value_created) {
      return {
        success: false,
        error: {
          scope: RepoInterfaceNames.Recurring,
          method: "register_next_recurring",
          code: "id_not_found",
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
    const result = db.query.recurring.findFirst({
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
          scope: RepoInterfaceNames.Recurring,
          method: "find_by_id",
          code: "id_not_found",
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
    const result = db.query.recurring_item_value.findFirst({
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
          scope: RepoInterfaceNames.Recurring,
          method: "find_item_value",
          code: "id_not_found",
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
    const result = db.query.recurring.findMany({
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
    const result = db.query.recurring_item_value.findMany({
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
  }

  public find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): ReturnType<IRepoRecurring["find_all_by_cashflow_type"]> {
    try {
      const result = db.select({
        id: recurring.id,
        description: recurring.description,
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
        .innerJoin(transfer_method, eq(transfer_method.id, item_value.fk_id_transfer_method))
        .innerJoin(tag, eq(tag.id, item_value.fk_id_tag))
        .innerJoin(item_value, eq(item_value.id, recurring_item_value.fk_id_item_value))
        .innerJoin(recurrence_type, eq(recurrence_type.id, recurring.fk_id_recurrence_type))
        .innerJoin(recurring, eq(recurring.id, recurring_item_value.fk_id_recurring))
        .where(eq(item_value.cashflow_type, cashflow_type))
        .all()

      const recurrings = result.map(recurring_mapper)

      return {
        success: true,
        data: recurrings
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_recurring(
          "find_all_by_cashflow_type",
          error as Error
        )
      }
    }
  }

  public update(id: MRecurring["id"], data: UpdateRecurringParams): ReturnType<IRepoRecurring["update"]> {
    const result = db.update(recurring).set({
      is_disabled: data.is_disabled ? 1 : 0,
      start_date: data.start_date,
      current_amount: data.current_amount,
      end_date: data.end_date,
      fk_id_tag: data.fk_id_tag,
      fk_id_transfer_method: data.fk_id_transfer_method,
      fk_id_recurrence_type: data.fk_id_recurrence_type
    })
      .where(eq(recurring_item_value.id, id))
      .returning({ id: recurring_item_value.id })
      .get()

    const recurring_updated = db.query.recurring.findFirst({
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
          scope: RepoInterfaceNames.Recurring,
          method: "update",
          code: "id_not_found",
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
    const recurring_deleted = db.delete(recurring).where(eq(recurring.id, id)).returning().get()

    if (!recurring_deleted) {
      return {
        success: false,
        error: {
          scope: RepoInterfaceNames.Recurring,
          method: "delete",
          code: "id_not_found",
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