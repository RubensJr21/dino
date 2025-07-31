import { MRecurrenceType } from '@src/core/models/recurrence_type.model'
import { CreateRecurrenceTypeParams, IRepoRecurrenceType, UpdateRecurrenceTypeParams } from '@src/core/shared/interfaces/IRepoRecurrenceType'
import { recurrence_type_mapper } from '@src/core/shared/mappers/recurrence_type'
import { recurrence_type } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'
import { Transaction } from '../database/TransactionType'

export default class RecurrenceTypeDrizzleRepository implements IRepoRecurrenceType {
  constructor(private tx: Transaction) { }
  
  public create(data: CreateRecurrenceTypeParams): ReturnType<IRepoRecurrenceType["create"]> {
    const recurrence_type_created = this.tx.insert(recurrence_type).values(data).returning().get()

    return {
      success: true,
      data: recurrence_type_mapper(recurrence_type_created)
    }
  }

  public find_by_id(id: MRecurrenceType["id"]): ReturnType<IRepoRecurrenceType["find_by_id"]> {
    const recurrence_type_searched = this.tx.query.recurrence_type.findFirst({
      where: eq(recurrence_type.id, id)
    }).sync()

    if (!recurrence_type_searched) {
      return {
        success: false,
        error: {
          code: 'id_not_found',
          scope: "recurrence_type",
          message: `Foi retornado o valor ${recurrence_type_searched} na busca.`
        }
      }
    }

    return {
      success: true,
      data: recurrence_type_mapper(recurrence_type_searched)
    }
  }

  public find_by_type(type: MRecurrenceType["type"]): ReturnType<IRepoRecurrenceType["find_by_type"]> {
    const recurrence_type_searched = this.tx.query.recurrence_type.findFirst({
      where: eq(recurrence_type.type, type)
    }).sync()

    if (!recurrence_type_searched) {
      return {
        success: false,
        error: {
          code: "type_not_found",
          scope: "recurrence_type",
          message: `Foi retornado o valor ${recurrence_type_searched} na busca.`
        }
      }
    }

    return {
      success: true,
      data: recurrence_type_mapper(recurrence_type_searched)
    }
  }

  public find_all(): ReturnType<IRepoRecurrenceType["find_all"]> {
    const result = this.tx.query.recurrence_type.findMany().sync()

    const recurrences_type = result.map(recurrence_type_mapper)

    return {
      success: true,
      data: recurrences_type
    }
  }

  public update(id: MRecurrenceType["id"], data: UpdateRecurrenceTypeParams): ReturnType<IRepoRecurrenceType["update"]> {
    const result = this.tx.update(recurrence_type).set(data).where(
      eq(recurrence_type.id, id)
    ).returning().get()

    const recurrence_type_updated = this.tx.query.recurrence_type.findFirst({ where: eq(recurrence_type.id, result.id) }).sync()

    if (!recurrence_type_updated) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "recurrence_type",
          message: "Um erro aconteceu ao obter o tipo de recorrência atualizado."
        }
      }
    };

    return {
      success: true,
      data: recurrence_type_mapper(recurrence_type_updated)
    }
  }

  public delete(id: MRecurrenceType["id"]): ReturnType<IRepoRecurrenceType["delete"]> {
    const recurrence_type_deleted = this.tx.delete(recurrence_type).where(
      eq(recurrence_type.id, id)
    ).returning().get();

    if (!recurrence_type_deleted) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "recurrence_type",
          message: "Ocorreu um erro ao deletar o tipo de recorrência."
        }
      }
    }

    return {
      success: true,
      data: true
    }
  }
}