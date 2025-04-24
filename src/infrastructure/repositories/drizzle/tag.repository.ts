import { db } from '@infrastructure/database/drizzle/client'
import { tag } from '@infrastructure/database/drizzle/schemas'
import IRepository from '@src/core/shared/IRepository'
import { MTag } from '@src/infrastructure/models/tag.model'
import { eq } from 'drizzle-orm/sql'

export interface IRepoTag extends IRepository<MTag> {
  findByDescription(description: string): Promise<MTag | undefined>;
}

export default class TagDrizzleRepository implements IRepoTag {
  public async create(data: StrictOmit<MTag, "id">): Promise<MTag | undefined> {
    const tags = await db.insert(tag).values(data).returning()
    return tags[0]
  }
  
  public async findById(id: number): Promise<MTag | undefined> {
    const tag_searched = await db.query.tag.findFirst({
      where: eq(tag.id, id)
    })
    if(!tag_searched){
      return undefined;
    }
    return tag_searched;
  }
  public async findByDescription(description: string): Promise<MTag | undefined> {
    const tag_searched = await db.query.tag.findFirst({
      where: eq(tag.description, description)
    })
    if(!tag_searched){
      return undefined;
    }
    return tag_searched;
  }
  public async findAll(): Promise<MTag[]> {
    return db.query.tag.findMany()
  }
  public async update(id: MTag["id"], data: StrictOmit<MTag, "id">): Promise<MTag | undefined> {
    const results = await db.update(tag).set(data).where(eq(tag.id, id)).returning()
    if(!results) return;
    return results[0]
  }
  public async delete(id: number): Promise<boolean> {
    const results = await db.delete(tag).where(
      eq(tag.id, id)
    ).returning();
    if(!results) return false;
    return true;
  }
}