import { db } from '@infrastructure/database/drizzle/client'
import { base_item_value, item_value } from '@infrastructure/database/drizzle/schemas'
import { MBaseItemValue } from '@src/infrastructure/models/base_item_value.model'
import { eq } from 'drizzle-orm/sql'

type MBaseItemValueWithoutAts = StrictOmit<MBaseItemValue, "created_at" | "updated_at">

type MBaseItemValueWithoutDate = StrictOmit<MBaseItemValueWithoutAts, "scheduled_at">

interface MBaseItemValueInput extends MBaseItemValueWithoutDate {
  scheduled_at: string;
}
interface MBaseItemValueOutput extends MBaseItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}

interface IRepository<T extends {biv_id: number}> {
  create(data: StrictOmit<T, "biv_id">): Promise<T | undefined>;
  findById(biv_id: T["biv_id"]): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  update(biv_id: T["biv_id"], data: StrictOmit<T, "biv_id">): Promise<T | undefined>;
  delete(biv_id: T["biv_id"]): Promise<boolean>;
}

type IRepoBaseItemValue = IRepository<MBaseItemValue>

export default class BaseItemValueDrizzleRepository implements IRepoBaseItemValue {
  private formatInput(input: StrictOmit<MBaseItemValueWithoutAts, "biv_id">): StrictOmit<MBaseItemValueInput, "biv_id">{
      return {
        ...input,
        scheduled_at: input.scheduled_at.toISOString().split('T')[0]
      }
    } 
    private formatOutput(output: MBaseItemValueOutput): MBaseItemValue {
      return {
        ...output,
        created_at: new Date(output.created_at),
        updated_at: new Date(output.updated_at),
        scheduled_at: new Date(output.scheduled_at)
      }
    }
  public async create(data: StrictOmit<MBaseItemValue, "biv_id">): Promise<MBaseItemValue | undefined> {
    const forInsert = this.formatInput(data)
		const baseItemValues = await db.insert(base_item_value).values(forInsert).returning()

    if(!baseItemValues) return;
    
    const {id, ...biv} = {...baseItemValues[0], biv_id: baseItemValues[0].id}
    return this.formatOutput(biv)
  }

  public async findById(id: number): Promise<MBaseItemValue | undefined> {
		const result = await db.query.base_item_value.findFirst({
			where: eq(base_item_value.id, id),
    })
		if(!result) return undefined;

    const {id: _, ...biv} = {...result, biv_id: result.id}
    return this.formatOutput(biv)
  }

  public async findAll(): Promise<MBaseItemValue[]> {
    const results = await db.query.base_item_value.findMany()
    return results.map(biv => {
      const {id: _, ...aux} = {...biv, biv_id: biv.id}
      return this.formatOutput(aux)
    })
  }

  public async update(id: number, data: StrictOmit<MBaseItemValue, "biv_id">): Promise<MBaseItemValue | undefined>{
    const forUpdate = this.formatInput(data)
    const results = await db.update(base_item_value).set(forUpdate).where(eq(base_item_value.id, id)).returning()
    if (!results) return;
    return this.findById(id)
  }

  public async delete(id: number): Promise<boolean>{
    const results = await db.delete(item_value).where(eq(item_value.id, id)).returning();
    if(!results) return false;
    return true;
  }
}