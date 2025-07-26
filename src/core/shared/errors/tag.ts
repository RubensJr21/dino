import { Tag } from "@src/core/entities/tag.entity";

export class TagNotFoundById extends Error {
  readonly name: string = "TagNotFoundById";
  
  constructor(tag_id: Tag["id"]){
    super(`Tag id: '${tag_id}' not founded!`, {
      cause: `The tag id '${tag_id}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isTagNotFoundById(error: unknown): error is TagNotFoundById {
  return error instanceof TagNotFoundById;
}

export class TagNotFoundByDescription extends Error {
  readonly name: string = "TagNotFoundByDescription";
  
  constructor(tag_description: Tag["description"]){
    super(`Tag description: '${tag_description}' not founded!`, {
      cause: `The tag description '${tag_description}' is invalid!`
    })
  }
}

// https://typescript.tv/errors/#ts1196
export function isTagNotFoundByDescription(error: unknown): error is TagNotFoundByDescription {
  return error instanceof TagNotFoundByDescription;
}