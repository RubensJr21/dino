import { Tag } from '@src/core/entities/tag.entity'
import { MTag } from '@src/core/models/tag.model'
import { build_internal_repo_error_tag, CreateTagParams, IRepoTag, UpdateTagParams } from '@src/core/shared/interfaces/IRepoTag'
import { tag_mapper } from '@src/core/shared/mappers/tag'
import { RepoInterfaceNames } from '@src/core/shared/types/RepoInterfaceNames'
import { tag } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'
import { db } from '../database/client'
import { Transaction } from '../database/Transaction'

export default class TagDrizzleRepository implements IRepoTag {
  constructor(private tx: Transaction) { }

  public create(data: CreateTagParams): ReturnType<IRepoTag["create"]> {
    try {
      const { id } = db.insert(tag).values(data).returning().get()

      const tag_created = db.query.tag.findFirst({
        where: eq(tag.id, id)
      }).sync()

      if (!tag_created) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Tag,
            method: "create",
            code: 'id_not_found',
            message: "Um erro ocorreu durante a criação"
          }
        }
      }

      return {
        success: true,
        data: tag_mapper(tag_created)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_tag(
          "create",
          error as Error
        )
      }
    }
  }

  public find_by_id(id: Tag["id"]): ReturnType<IRepoTag["find_by_id"]> {
    try {
      const tag_searched = db.query.tag.findFirst({
        where: eq(tag.id, id)
      }).sync()

      if (!tag_searched) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Tag,
            method: "find_by_id",
            code: 'id_not_found',
            message: `Foi retornado o valor ${tag_searched} na busca.`
          }
        }
      }
      return {
        success: true,
        data: tag_mapper(tag_searched)
      };
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_tag(
          "find_by_id",
          error as Error
        )
      }
    }
  }

  public find_by_description(description: Tag["description"]): ReturnType<IRepoTag["find_by_description"]> {
    try {
      const tag_searched = db.query.tag.findFirst({
        where: eq(tag.description, description)
      }).sync()
  
      if (!tag_searched) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Tag,
            method: "find_by_description",
            code: 'description_not_found',
            message: `Foi retornado o valor ${tag_searched} na busca.`
          }
        }
      }
      return {
        success: true,
        data: tag_mapper(tag_searched)
      };
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_tag(
          "find_by_description",
          error as Error
        )
      }
    }
  }

  public find_all(): ReturnType<IRepoTag["find_all"]> {
    try {
      const result = db.query.tag.findMany().sync()
  
      const tags = result.map(tag_mapper)
  
      return {
        success: true,
        data: tags
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_tag(
          "find_all",
          error as Error
        )
      }
    }
  }

  public update(id: MTag["id"], data: UpdateTagParams): ReturnType<IRepoTag["update"]> {
    try {
      const result = db.update(tag).set(data).where(eq(tag.id, id)).returning({ id: tag.id }).get()
  
      const tag_updated = db.query.tag.findFirst({ where: eq(tag.id, result.id) }).sync()
  
      if (!tag_updated) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Tag,
            method: "update",
            code: "id_not_found",
            message: "Um erro aconteceu ao obter a tag atualizada."
          }
        }
      };
  
      return {
        success: true,
        data: tag_mapper(tag_updated)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_tag(
          "update",
          error as Error
        )
      }
    }
  }

  public delete(id: number): ReturnType<IRepoTag["delete"]> {
    try {
      const tag_deleted = db.delete(tag).where(
        eq(tag.id, id)
      ).returning().get();
  
      if (!tag_deleted) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Tag,
            method: "delete",
            code: "id_not_found",
            message: "Ocorreu um erro ao deletar a tag."
          }
        }
      }
  
      return {
        success: true,
        data: true
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_tag(
          "delete",
          error as Error
        )
      }
    }
  }
}