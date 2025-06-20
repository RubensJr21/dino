import { ItemValue } from '@src/core/entities/item_value.entity'
import { RecurrenceType } from '@src/core/entities/recurrence_type.entity'
import { Recurring } from '@src/core/entities/recurring.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethodType } from '@src/core/entities/transfer_method_type.entity'
import { MRecurring } from '@src/core/models/recurring.model'
import { RecurringNotFoundById } from '@src/core/shared/errors/recurring'
import { IRepoRecurring, IRepoRecurringCreateProps, IRepoRecurringUpdateProps } from '@src/core/shared/IRepositoryRecurring'
import { db } from '@src/infrastructure/database/client'
import { item_value, recurring, recurring_item_value } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

export default class RecurringDrizzleRepository implements IRepoRecurring {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private dateToString(d: Date){
    return d.toISOString().split('T')[0]
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create({
    fk_id_recurrence_type,
    current_amount,
    itens
  }: IRepoRecurringCreateProps): Recurring {
    // Registra Recurring
    const recurring_result = db.insert(recurring).values({
      fk_id_recurrence_type,
      is_disabled: false,
      current_amount
    }).returning({ id: recurring.id }).get()

    itens.forEach(_item_value => {
      const item_value_result = db.insert(item_value).values({
        id: _item_value.id,
        description: _item_value.description,
        type: _item_value.type,
        scheduled_at: this.dateToString(_item_value.scheduled_at),
        amount: _item_value.amount,
        was_processed: _item_value.was_processed,
        fk_id_transfer_method_type: _item_value.transfer_method_type.id,
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
    const recurring_item_value_result = db.query.recurring_item_value.findMany({
      where: eq(recurring_item_value.id, id),
      with: {
        item_value: {
          with: {
            tag: true,
            transfer_method_type: true,
          }
        },
        recurring: {
          with: {
            recurrence_type: true
          }
        }
      }
    }).sync()
    if(!recurring_item_value_result) throw new RecurringNotFoundById(id);

    const itens = recurring_item_value_result.map(_recurring => {
      return new ItemValue({
        id: _recurring.item_value.id,
        description: _recurring.item_value.description,
        type: _recurring.item_value.type,
        scheduled_at: new Date(_recurring.item_value.scheduled_at),
        amount: _recurring.item_value.amount,
        was_processed: _recurring.item_value.was_processed,
        transfer_method_type: new TransferMethodType(_recurring.item_value.transfer_method_type),
        tag: new Tag(_recurring.item_value.tag),
        created_at: new Date(_recurring.item_value.created_at),
        updated_at: new Date(_recurring.item_value.updated_at),
      })
    })


    return new Recurring({
      id,
      is_disabled: recurring_item_value_result[0].recurring.is_disabled,
      current_amount: recurring_item_value_result[0].recurring.current_amount,
      recurrence_type: new RecurrenceType(recurring_item_value_result[0].recurring.recurrence_type),
      created_at: new Date(recurring_item_value_result[0].recurring.created_at),
      updated_at: new Date(recurring_item_value_result[0].recurring.updated_at),
      itens
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): Recurring[] {
    const result = db.query.recurring_item_value.findMany({
      columns: { id: true }
    }).sync()
    return result.map((riv) => this.findById(riv.id)) 
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MRecurring["id"], data: IRepoRecurringUpdateProps): Recurring {
    // ATTENTION: ISSO É CONTROLADO NOS CASOS DE USO
    // const item_value_result = db.update(item_value).set({
    //   ...item_value_values,
    // }).where(eq(item_value.id, fk_id_item_value)).returning().get()

    const recurring_result = db.update(recurring).set(data)
                                .where(eq(recurring_item_value.id, id))
                                .returning({ id: recurring_item_value.id})
                                .get()
    return this.findById(recurring_result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MRecurring["id"]): boolean{
    const result = db.delete(recurring_item_value).where(eq(recurring_item_value.id, id)).returning().get()
    return !result ? false : true
  }
}