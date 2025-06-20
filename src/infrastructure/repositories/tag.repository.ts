import { Tag } from '@src/core/entities/tag.entity'
import { MTag } from '@src/core/models/tag.model'
import { TagNotFoundByDescription, TagNotFoundById } from '@src/core/shared/errors/tag'
import { IRepositoryWithoutDates, IRepositoryWithoutDatesCreateProps, IRepositoryWithoutDatesUpdateProps } from "@src/core/shared/IRepositoryWithoutDates"
import { db } from '@src/infrastructure/database/client'
import { tag } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

export interface IRepoTag extends IRepositoryWithoutDates<MTag, Tag> {
  /**
   * Implementação do Método de criação da entidade Tag
   * @param {IRepositoryWithoutDatesCreateProps<MTag>} data Atributos que são passados para a criação de uma nova Tag
   * @returns {Tag} Retorna objeto que representa a entidade Tag que contém os dados informados para criação
   */
  create(data: IRepositoryWithoutDatesCreateProps<MTag>): Tag;

  /**
   * Implementação do método retorna a Tag que tiver o id informado
   * @param {Tag["id"]} id id pelo qual a tag será buscada
   * @throws {TagNotFoundById}
   * @returns {Tag} Retorna objeto que representa a entidade Tag que contém o id informado
   */
  findById(id: Tag["id"]): Tag;

  /**
   * Esse método retorna a Tag que tiver a description informada
   * @param {Tag["description"]} description descrição pela qual a tag será procurada
   * @throws {TagNotFoundByDescription}
   * @returns {Tag} Retorna objeto que representa a entidade Tag que contém a description informada
   */
  findByDescription(description: string): MTag;

  /**
   * Método para retornar todas as Tags
   * @returns {Tag[]} retorna uma lista de Tags
   */
  findAll(): Tag[];

  /**
   * Implementa método de update de Tag
   * @param {MTag["id"]} id id pela qual a Tag será buscada
   * @param {IRepositoryWithoutDatesUpdateProps<MTag>} data valores que serão atualizado
   * @throws {TagNotFoundById}
   * @returns {Tag} Retorna um objeto que representa a entidade Tag que contém a id informada
   */
  update(id: MTag["id"], data: IRepositoryWithoutDatesUpdateProps<MTag>): Tag;

  /**
   * Implementa método que deleta a Tag
   * @param {number} id Id da Tag a ser excluída
   * @returns {boolean} retorna true se conseguiu excluir e false caso contrário
   */
  delete(id: number): boolean;
}

export default class TagDrizzleRepository implements IRepoTag {
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryWithoutDatesCreateProps<MTag>): Tag {
    const tags = db.insert(tag).values(data).returning().get()
    return new Tag(tags)
  }
   
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: Tag["id"]): Tag {
    const tag_searched = db.query.tag.findFirst({
      where: eq(tag.id, id)
    }).sync()
    if(!tag_searched){
      throw new TagNotFoundById(id)
    }
    return new Tag(tag_searched);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findByDescription(description: Tag["description"]): Tag {
    const tag_searched = db.query.tag.findFirst({
      where: eq(tag.description, description)
    }).sync()
    if(!tag_searched){
      throw new TagNotFoundByDescription(description);
    }
    return new Tag(tag_searched);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): Tag[] {
    return db.query.tag.findMany().sync().map(tag => new Tag(tag))
  }
   
  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MTag["id"], data: IRepositoryWithoutDatesUpdateProps<MTag>): Tag {
    const result = db.update(tag).set(data).where(eq(tag.id, id)).returning().get()
    if(!result) throw new TagNotFoundById(id);
    return new Tag(result)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: number): boolean {
    const result = db.delete(tag).where(
      eq(tag.id, id)
    ).returning().get();
    if(!result) return false;
    return true;
  }
}