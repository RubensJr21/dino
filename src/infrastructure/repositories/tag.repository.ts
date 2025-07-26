import { Tag } from '@src/core/entities/tag.entity'
import { MTag } from '@src/core/models/tag.model'
import { CreateTagParams, IRepoTag, UpdateTagParams } from '@src/core/shared/interfaces/IRepoTag'
import { tag_mapper } from '@src/core/shared/mappers/tag'
import { tag } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'
import { Transaction } from '../database/TransactionType'

export default class TagDrizzleRepository implements IRepoTag {
  constructor(private tx: Transaction) { }
  
  public create(data: CreateTagParams): ReturnType<IRepoTag["create"]> {
    const tag_created = this.tx.insert(tag).values(data).returning().get()

    return {
      success: true,
      data: tag_mapper(tag_created)
    }
  }
   
  public findById(id: Tag["id"]): ReturnType<IRepoTag["findById"]> {
    const tag_searched = this.tx.query.tag.findFirst({
      where: eq(tag.id, id)
    }).sync()

    if(!tag_searched){
      return {
        success: false,
        error: {
          code: 'id_not_found',
          scope: "tag",
          message: `Foi retornado o valor ${tag_searched} na busca.`
        }
      }
    }
    return {
      success: true,
      data: tag_mapper(tag_searched)
    };
  }

  public findByDescription(description: Tag["description"]): ReturnType<IRepoTag["findByDescription"]> {
    const tag_searched = this.tx.query.tag.findFirst({
      where: eq(tag.description, description)
    }).sync()

     if(!tag_searched){
      return {
        success: false,
        error: {
          code: 'description_not_found',
          scope: "tag",
          message: `Foi retornado o valor ${tag_searched} na busca.`
        }
      }
    }
    return {
      success: true,
      data: tag_mapper(tag_searched)
    };
  }

  public findAll(): ReturnType<IRepoTag["findAll"]> {
    const result = this.tx.query.tag.findMany().sync()

    const tags = result.map(tag_mapper)

    return {
      success: true,
      data: tags
    }
  }
   
  public update(id: MTag["id"], data: UpdateTagParams): ReturnType<IRepoTag["update"]> {
    const result = this.tx.update(tag).set(data).where(eq(tag.id, id)).returning({id: tag.id}).get()

    const tag_updated = this.tx.query.tag.findFirst({ where: eq(tag.id, result.id)}).sync()

    if(!tag_updated) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "tag",
          message: "Um erro aconteceu ao obter a tag atualizada."
        }
      }
    };

    return {
      success: true,
      data: tag_mapper(tag_updated)
    }
  }

  public delete(id: number): ReturnType<IRepoTag["delete"]> {
    const tag_deleted = this.tx.delete(tag).where(
      eq(tag.id, id)
    ).returning().get();

    if (!tag_deleted) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "tag",
          message: "Ocorreu um erro ao deletar a tag."
        }
      }
    }

    return {
      success: true,
      data: true
    }
  }
}