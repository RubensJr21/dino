import { Tag } from '@core/entities/tag.entity'
import { DTO_Tag } from '@core/shared/DTOTypes'
import { Partial_DTO_Tag } from '@core/shared/PartialEntitiesTypes'
import { IRepoTag } from '@core/shared/RepositoryTypes'
import { db } from '@infrastructure/database/drizzle/client'
import { tag } from '@infrastructure/database/drizzle/schemas'
import { eq } from 'drizzle-orm/sql'

export default class TagDrizzleRepository implements IRepoTag {
    public async create(data: DTO_Tag): Promise<Tag | undefined> {
        const tags = await db.insert(tag).values(data).returning()
        return tags[0]
    }
    public async findById(id: number): Promise<Tag | undefined> {
        return db.query.tag.findFirst({
            where: eq(tag.id, id)
        })
    }
    findByDescription(description: string): Promise<Tag | undefined> {
        return db.query.tag.findFirst({
            where: eq(tag.description, description)
        })
    }
    public async findAll(): Promise<Tag[]> {
        return db.query.tag.findMany()
    }
    public async update(data: Partial_DTO_Tag): Promise<Tag | undefined> {
        const {
            id: idForUpdate,
            ...forUpdate
        } = data
        const results = await db.update(tag).set(forUpdate).where(eq(tag.id, idForUpdate))
        if(!results) return;
        return this.findById(idForUpdate)
    }
    public async delete(id: number): Promise<boolean> {
        const results = await db.delete(tag).where(eq(tag.id, id)).returning();
        if(!results) return false;
        return true;
    }

}