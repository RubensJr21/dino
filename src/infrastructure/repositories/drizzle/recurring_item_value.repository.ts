import { db } from '@infrastructure/database/drizzle/client'
import { base_item_value, recurring_item_value } from '@infrastructure/database/drizzle/schemas'
import { RecurrenceType } from '@src/core/entities/recurrence_type.entity'
import { RecurringItemValue } from '@src/core/entities/recurring_item_value.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethodType } from '@src/core/entities/transfer_method_type.entity'
import { RecurringItemValueNotFoundById } from '@src/core/shared/errors/recurring_item_value'
import { IRepoItemValueCreateProps, IRepoItemValueUpdateProps, IRepositoryItemValue } from "@src/core/shared/IRepositoryItemValue"
import { MRecurringItemValue } from '@src/infrastructure/models/recurring_item_value.model'
import { eq } from 'drizzle-orm/sql'

type MRecurringItemValueWithoutAts = StrictOmit<MRecurringItemValue, "created_at" | "updated_at">

type MRecurringItemValueWithoutDate = StrictOmit<MRecurringItemValueWithoutAts, "scheduled_at">

interface MRecurringItemValueOutput extends MRecurringItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}

export interface IRepoRecurringItemValue extends IRepositoryItemValue<MRecurringItemValue, RecurringItemValue> {
  /**
   * Creates a new recurring item value in the database
   * @param {IRepoItemValueCreateProps<MRecurringItemValue>} data The data required to create a recurring item value
   * @returns {RecurringItemValue} The newly created RecurringItemValue instance
   */
  create(data: IRepoItemValueCreateProps<MRecurringItemValue>): RecurringItemValue;

  /**
   * Retrieves a recurring item value by its unique identifier
   * @param {MRecurringItemValue["id"]} id The unique identifier of the recurring item value to find
   * @returns {RecurringItemValue} The found recurring item value with associated tag, transfer method type, and recurrence type
   * @throws {RecurringItemValueNotFoundById} If no recurring item value is found with the given ID
   */
  findById(id: MRecurringItemValue["id"]): RecurringItemValue;

  /**
   * Retrieves all recurring item values with their associated base item values, tags, transfer method types, and recurrence types.
   * @returns {RecurringItemValue[]} An array of fully hydrated RecurringItemValue instances
   */
  findAll(): RecurringItemValue[];

  /**
   * Updates a recurring item value and its associated base item value
   * @param {MRecurringItemValue["id"]} id - The ID of the recurring item value to update
   * @param {IRepoItemValueUpdateProps<MRecurringItemValue>} data - The update data for the recurring item value
   * @returns {RecurringItemValue} The updated recurring item value
   */
  update(id: MRecurringItemValue["id"], data: IRepoItemValueUpdateProps<MRecurringItemValue>): RecurringItemValue;

  /**
   * Deletes a recurring item value by its ID
   * @param {MRecurringItemValue["id"]} id - The unique identifier of the recurring item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MRecurringItemValue["id"]): boolean
}

export default class ItemValueDrizzleRepository implements IRepoRecurringItemValue {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private dateToString(d: Date){
    return d.toISOString().split('T')[0]
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatOutput(output: MRecurringItemValueOutput): MRecurringItemValue {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      scheduled_at: new Date(output.scheduled_at)
    }
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepoItemValueCreateProps<MRecurringItemValue>): RecurringItemValue {
    const {
      fk_id_recurrence_type,
      ...base_item_value_values
    } = data
    
    const base_item_value_result = db.insert(base_item_value).values({
      ...base_item_value_values,
      scheduled_at: this.dateToString(base_item_value_values.scheduled_at)
    }).returning().get()

    const recurring_item_value_result = db.insert(recurring_item_value).values({
      fk_id_base_item_value: base_item_value_result.id,
      fk_id_recurrence_type,
      is_disabled: false
    }).returning().get()

    return this.findById(recurring_item_value_result.id)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MRecurringItemValue["id"]): RecurringItemValue {
    const result = db.query.recurring_item_value.findFirst({
      where: eq(recurring_item_value.id, id),
      with: {
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true,
          }
        },
        recurrence_type: true
      }
    }).sync()
    if(!result) throw new RecurringItemValueNotFoundById(id);

    const {
      base_item_value: _,
      tag,
      transfer_method_type,
      recurrence_type,
      ...recurring_item_value_searched
    } = {
      ...result,
      ...result.base_item_value,
      base_item_value_id: result.base_item_value.id
    }

    const {
      fk_id_tag,
      fk_id_transfer_method_type,
      fk_id_recurrence_type,
      ...parsed
    } ={
      ...this.formatOutput(recurring_item_value_searched),
      tag: new Tag(tag),
      transfer_method_type: new TransferMethodType(transfer_method_type),
      recurrence_type: new RecurrenceType(recurrence_type)
    }

    return new RecurringItemValue(parsed)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): RecurringItemValue[] {
    const result = db.query.recurring_item_value.findMany({
      with: {
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true,
          }
        },
        recurrence_type: true
      }
    }).sync()
    return result.map((riv) => {
      const {
        base_item_value: _,
        tag,
        transfer_method_type,
        recurrence_type,
        ...recurring_item_value_searched
      } = {
        ...riv,
        ...riv.base_item_value,
        base_item_value_id: riv.base_item_value.id
      }
  
      const {
        fk_id_tag,
        fk_id_transfer_method_type,
        fk_id_recurrence_type,
        ...parsed
      } ={
        ...this.formatOutput(recurring_item_value_searched),
        tag: new Tag(tag),
        transfer_method_type: new TransferMethodType(transfer_method_type),
        recurrence_type: new RecurrenceType(recurrence_type)
      }
  
      return new RecurringItemValue(parsed)
    }) 
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MRecurringItemValue["id"], data: IRepoItemValueUpdateProps<MRecurringItemValue>): RecurringItemValue {
   const {
      fk_id_base_item_value,
      is_disabled,
      fk_id_recurrence_type,
      ...base_item_value_values
    } = data
    
    const base_item_value_result = db.update(base_item_value).set({
      ...base_item_value_values,
      scheduled_at: this.dateToString(base_item_value_values.scheduled_at)
    }).where(eq(base_item_value.id, fk_id_base_item_value)).returning().get()

    const recurring_item_value_result = db.update(recurring_item_value).set({
      fk_id_base_item_value,
      fk_id_recurrence_type,
      is_disabled,
    }).where(eq(recurring_item_value.id, id)).returning().get()

    return this.findById(recurring_item_value_result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MRecurringItemValue["id"]): boolean{
    const result = db.delete(recurring_item_value).where(eq(recurring_item_value.id, id)).returning().get()
    return !result ? false : true
  }
}