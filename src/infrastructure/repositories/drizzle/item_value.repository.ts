import { db } from '@infrastructure/database/drizzle/client'
import { item_value } from '@infrastructure/database/drizzle/schemas'
import IRepository from '@src/core/shared/IRepository'
import { MItemValue } from '@src/infrastructure/models/item_value.model'
import { eq } from 'drizzle-orm/sql'

type MItemValueWithoutAts = StrictOmit<MItemValue, "created_at" | "updated_at">

type MItemValueWithoutDate = StrictOmit<MItemValueWithoutAts, "scheduled_at">

interface MItemValueOutput extends MItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}

export type IRepoItemValue = IRepository<MItemValue>

export default class ItemValueDrizzleRepository implements IRepoItemValue {
  private formatOutput(output: MItemValueOutput): MItemValue {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      scheduled_at: new Date(output.scheduled_at)
    }
  }
  public async create(data: StrictOmit<MItemValue, "id">): Promise<MItemValue | undefined> {
		const forInsert = {
			base_item_value_id: data.biv_id
		}
		const results = await db.insert(item_value).values(forInsert).returning()
    return this.findById(results[0].id)
  }

  public async findById(id: number): Promise<MItemValue | undefined> {
		const result = await db.query.item_value.findFirst({
			where: eq(item_value.id, id),
			with: {
        base_item_value: true
      }
    })
		if(!result) return undefined;

		const {
      base_item_value: _,
      ...item_value_searched
    } = {
      ...result,
      ...result.base_item_value,
      biv_id: result.base_item_value.id
    } 

    return this.formatOutput(item_value_searched)
  }

  public async findAll(): Promise<MItemValue[]>{
    const result = await db.query.item_value.findMany({
      with: {
        base_item_value: true
      }
    })
    return result.map((iv) => {
      const {
        base_item_value: _,
        ...item_value_searched
      } = {
        ...iv,
        ...iv.base_item_value,
        biv_id: iv.base_item_value.id
      } 
  
      return this.formatOutput(item_value_searched)
    }) 
  }

  public async update(id: number, data: StrictOmit<MItemValue, "id">): Promise<MItemValue | undefined> {
    const forUpdate = {
      base_item_value_id: data.biv_id
    }
    const results = await db.update(item_value).set(forUpdate).where(eq(item_value.id, id))

    if(!results) return undefined;

    return this.findById(id)
  }

  public async delete(id: number): Promise<boolean>{
    await db.delete(item_value).where(eq(item_value.id, id))
    return true
  }
}