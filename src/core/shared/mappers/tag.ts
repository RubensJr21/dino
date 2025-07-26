import { ITag, Tag } from "@src/core/entities/tag.entity";

export function tag_mapper(input: ITag): Tag {
  return new Tag(input)
}