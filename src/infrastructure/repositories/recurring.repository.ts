import { ItemValue } from '@src/core/entities/item_value.entity'
import { RecurrenceType } from '@src/core/entities/recurrence_type.entity'
import { Recurring } from '@src/core/entities/recurring.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethod } from '@src/core/entities/transfer_method.entity'
import { MRecurring } from '@src/core/models/recurring.model'
import { RecurringNotFoundById } from '@src/core/shared/errors/recurring'
import { IRepoRecurring, IRepoRecurringCreateProps, IRepoRecurringUpdateProps } from '@src/core/shared/interfaces/IRepositoryRecurring'
import { db } from '@src/infrastructure/database/client'
import { item_value, recurring, recurring_item_value } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

export default class RecurringDrizzleRepository implements IRepoRecurring {  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create({
    start_date,
    end_date,
    current_amount,
    itens,
    fk_id_recurrence_type,
  }: IRepoRecurringCreateProps): Recurring {
    // Registra Recurring
    const recurring_result = db.insert(recurring).values({
      start_date,
      end_date,
      current_amount,
      fk_id_recurrence_type,
    }).returning({ id: recurring.id }).get()

    itens.forEach(_item_value => {
      const item_value_result = db.insert(item_value).values({
        id: _item_value.id,
        description: _item_value.description,
        cashflow_type: _item_value.cashflow_type,
        scheduled_at: _item_value.scheduled_at,
        amount: _item_value.amount,
        was_processed: _item_value.was_processed,
        fk_id_transfer_method: _item_value.transfer_method.id,
        fk_id_tag: _item_value.tag.id
      }).returning({ id: item_value.id }).get()

      db.insert(recurring_item_value).values({
        fk_id_item_value: item_value_result.id,
        fk_id_recurring: recurring_result.id
      }).get()
    })

    return this.findById(recurring_result.id)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MRecurring["id"]): Recurring {
    const recurring_result = db.query.recurring.findFirst({
      where: eq(recurring.id, id),
      with: {
        recurrence_type: true
      }
    }).sync()

    if(!recurring_result){
      throw new RecurringNotFoundById(id);
    }
    
    const recurring_item_value_result = db.query.recurring_item_value.findMany({
      where: eq(recurring_item_value.id, id),
      with: {
        item_value: {
          with: {
            tag: true,
            transfer_method: true,
          }
        }
      }
    }).sync()
    if(!recurring_item_value_result) throw new RecurringNotFoundById(id);

    const itens = recurring_item_value_result.map(_recurring => {
      return new ItemValue({
        id: _recurring.item_value.id,
        description: _recurring.item_value.description,
        cashflow_type: _recurring.item_value.cashflow_type,
        scheduled_at: _recurring.item_value.scheduled_at,
        amount: _recurring.item_value.amount,
        was_processed: _recurring.item_value.was_processed,
        transfer_method: new TransferMethod(_recurring.item_value.transfer_method),
        tag: new Tag(_recurring.item_value.tag),
        created_at: _recurring.item_value.created_at,
        updated_at: _recurring.item_value.updated_at,
      })
    })

    return new Recurring({
      id,
      start_date: recurring_result.start_date,
      end_date: recurring_result.end_date ?? undefined,
      current_amount: recurring_result.current_amount,
      recurrence_type: new RecurrenceType(recurring_result.recurrence_type),
      created_at: recurring_result.created_at,
      updated_at: recurring_result.updated_at,
      itens
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): Recurring[] {
    const result = db.query.recurring_item_value.findMany({
      columns: { id: true }
    }).sync()
    return result.map(({ id }) => this.findById(id)) 
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAllByCashflowType(cashflow_type: ItemValue["cashflow_type"]): Recurring[]{
    const result = db.select({
      id: recurring_item_value.id,
    })
    .from(recurring_item_value)
    .innerJoin(recurring, eq(recurring.id, recurring_item_value.fk_id_recurring))
    .innerJoin(item_value, eq(item_value.id, recurring_item_value.fk_id_item_value))
    .where(eq(item_value.cashflow_type, cashflow_type))
    .all()
    if(!result) return [];
    return result.map(({ id }) => this.findById(id))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MRecurring["id"], data: IRepoRecurringUpdateProps): Recurring {
    const recurring_result = db.update(recurring).set(data)
                                .where(eq(recurring_item_value.id, id))
                                .returning({ id: recurring_item_value.id})
                                .get()
    return this.findById(recurring_result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MRecurring["id"]): boolean {
    const result = db.delete(recurring_item_value).where(eq(recurring_item_value.id, id)).returning().get()
    return !result ? false : true
  }
}