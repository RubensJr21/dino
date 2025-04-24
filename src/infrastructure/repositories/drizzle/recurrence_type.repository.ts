import { db } from '@infrastructure/database/drizzle/client'
import { recurrence_type } from '@infrastructure/database/drizzle/schemas'
import IRepository from '@src/core/shared/IRepository'
import { MRecurrenceType } from '@src/infrastructure/models/recurrence_type.model'
import { eq } from 'drizzle-orm/sql'

interface MRecurrenceTypeOutput extends MRecurrenceType {
  created_at: string;
  updated_at: string;
}

export interface IRepoRecurrenceType extends IRepository<MRecurrenceType> {
  findByType(type: string): Promise<MRecurrenceType | undefined>;
}

export default class RecurrenceTypeDrizzleRepository implements IRepoRecurrenceType {
  public async create(data: StrictOmit<MRecurrenceType, "id">): Promise<MRecurrenceType | undefined> {
    const recurrence_types = await db.insert(recurrence_type).values(data).returning()
    return recurrence_types[0]
  }

  public async findById(id: number): Promise<MRecurrenceType | undefined> {
    return db.query.recurrence_type.findFirst({
      where: eq(recurrence_type.id, id)
    })
  }

  findByType(type: string): Promise<MRecurrenceType | undefined> {
    return db.query.recurrence_type.findFirst({
      where: eq(recurrence_type.type, type)
    })
  }

  public async findAll(): Promise<MRecurrenceType[]> {
    return db.query.recurrence_type.findMany()
  }

  public async update(id: MRecurrenceType["id"], data: StrictOmit<MRecurrenceType, "id">): Promise<MRecurrenceType | undefined> {
    const results = await db.update(recurrence_type).set(data).where(
      eq(recurrence_type.id, id)
    ).returning()
    if(!results) return;
    return this.findById(id)
  }

  public async delete(id: number): Promise<boolean> {
    const results = await db.delete(recurrence_type).where(
      eq(recurrence_type.id, id)
    ).returning();
    if(!results) return false;
    return true;
  }

}