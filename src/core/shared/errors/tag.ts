import { Tag } from "@src/core/entities/tag.entity";

export class TagNotFoundById extends Error {
  readonly name: string = "TagNotFoundById";
  /**
   * Método construtor do Erro TagNotFoundById
   * @param {Tag["id"]} tag_id tag_id que gerou erro ao ser buscada
   */
  constructor(tag_id: Tag["id"]){
    super(`Tag id: '${tag_id}' not founded!`, {
      cause: `The tag id '${tag_id}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um TagNotFoundById
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is TagNotFoundById} Retorna se o objeto é do tipo TagNotFoundById
 */
// https://typescript.tv/errors/#ts1196
export function isTagNotFoundById(error: unknown): error is TagNotFoundById {
  return error instanceof TagNotFoundById;
}

export class TagNotFoundByDescription extends Error {
  readonly name: string = "TagNotFoundByDescription";
  /**
   * Método construtor do Erro TagNotFoundByDescription
   * @param {Tag["description"]} tag_description tag_description que gerou erro ao ser buscada
   */
  constructor(tag_description: Tag["description"]){
    super(`Tag description: '${tag_description}' not founded!`, {
      cause: `The tag description '${tag_description}' is invalid!`
    })
  }
}

/**
 * Função que retorna se o objeto passado é um TagNotFoundByDescription
 * @param {unknown} error Objeto de Erro a ser verificado
 * @returns {error is TagNotFoundByDescription} Retorna se o objeto é do tipo TagNotFoundByDescription
 */
// https://typescript.tv/errors/#ts1196
export function isTagNotFoundByDescription(error: unknown): error is TagNotFoundByDescription {
  return error instanceof TagNotFoundByDescription;
}