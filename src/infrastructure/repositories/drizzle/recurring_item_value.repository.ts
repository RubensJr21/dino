import { db } from '@infrastructure/database/drizzle/client'
import { recurring_item_value } from '@infrastructure/database/drizzle/schemas'
import IRepository from '@src/core/shared/IRepository'
import { MRecurringItemValue } from '@src/infrastructure/models/recurring_item_value.model'
import { eq } from 'drizzle-orm/sql'

type MRecurringItemValueWithoutAts = StrictOmit<MRecurringItemValue, "created_at" | "updated_at">

type MRecurringItemValueWithoutDate = StrictOmit<MRecurringItemValueWithoutAts, "scheduled_at">

interface MRecurringItemValueOutput extends MRecurringItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}

export type IRepoRecurringItemValue = IRepository<MRecurringItemValue>

export default class ItemValueDrizzleRepository implements IRepoRecurringItemValue {
  private formatOutput(output: MRecurringItemValueOutput): MRecurringItemValue {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      scheduled_at: new Date(output.scheduled_at)
    }
  }
  public async create(data: StrictOmit<MRecurringItemValue, "id">): Promise<MRecurringItemValue | undefined> {
    const forInsert = {
      base_item_value_id: data.biv_id,
      is_disabled: data.is_disabled,
      recurrence_type_id: data.recurrence_type_id
    }
    const results = await db.insert(recurring_item_value).values(forInsert).returning()
    return this.findById(results[0].id)
  }

  public async findById(id: number): Promise<MRecurringItemValue | undefined> {
    const result = await db.query.recurring_item_value.findFirst({
      where: eq(recurring_item_value.id, id),
        with: {
          base_item_value: true
        }
    })
    if(!result) return undefined;

    const {
      base_item_value: _,
      ...recurring_item_value_searched
    } = {
      ...result,
      ...result.base_item_value,
      biv_id: result.base_item_value.id
    }

    return this.formatOutput(recurring_item_value_searched)
  }

  public async findAll(): Promise<MRecurringItemValue[]>{
    const result = await db.query.recurring_item_value.findMany({
      with: {
        base_item_value: true,
        recurrence_type: true
      }
    })
    return result.map((riv) => {
      const {
        base_item_value: _,
        ...recurring_item_value_searched
      } = {
        ...riv,
        ...riv.base_item_value,
        biv_id: riv.base_item_value.id
      }
  
      return this.formatOutput(recurring_item_value_searched)
    }) 
  }

  public async update(id: number, data: StrictOmit<MRecurringItemValue, "id">): Promise<MRecurringItemValue | undefined> {
    const forUpdate = {
      base_item_value_id: data.biv_id,
      is_disabled: data.is_disabled,
      recurrence_type_id: data.recurrence_type_id
    }
    const results = await db.update(recurring_item_value).set(forUpdate).where(eq(recurring_item_value.id, id))

    if(!results) return undefined;

    return this.findById(id)
  }

  public async delete(id: number){
    await db.delete(recurring_item_value).where(eq(recurring_item_value.id, id))
    return true
  }
}