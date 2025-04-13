import { RecurrenceType } from '@core/entities/recurrence_type.entity'
import { DTO_RecurrenceType } from '@core/shared/DTOTypes'
import { Partial_DTO_RecurrenceType } from '@core/shared/PartialEntitiesTypes'
import { IRepoRecurrenceType } from '@core/shared/RepositoryTypes'
import { db } from '@infrastructure/database/drizzle/client'
import { recurrence_type } from '@infrastructure/database/drizzle/schemas'
import { eq } from 'drizzle-orm/sql'

export default class RecurrenceTypeDrizzleRepository implements IRepoRecurrenceType {
    public async create(data:DTO_RecurrenceType): Promise<RecurrenceType | undefined> {
        const recurrence_types = await db.insert(recurrence_type).values(data).returning()
        return recurrence_types[0]
    }
    public async findById(id: number): Promise<RecurrenceType | undefined> {
        return db.query.recurrence_type.findFirst({
            where: eq(recurrence_type.id, id)
        })
    }
    findByType(type: string): Promise<RecurrenceType | undefined> {
        return db.query.recurrence_type.findFirst({
            where: eq(recurrence_type.type, type)
        })
    }
    public async findAll(): Promise<RecurrenceType[]> {
        return db.query.recurrence_type.findMany()
    }
    public async update(data: Partial_DTO_RecurrenceType): Promise<RecurrenceType | undefined> {
        const {
            id: idForUpdate,
            ...forUpdate
        } = data
        const results = await db.update(recurrence_type).set(forUpdate).where(eq(recurrence_type.id, idForUpdate))
        if(!results) return;
        return this.findById(idForUpdate)
    }
    public async delete(id: number): Promise<boolean> {
        const results = await db.delete(recurrence_type).where(eq(recurrence_type.id, id)).returning();
        if(!results) return false;
        return true;
    }

}