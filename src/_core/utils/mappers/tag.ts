import { ITag, Tag } from "@domain/entities/tag.entity";

type MapperInput = ITag

export function tag_mapper(input: MapperInput): Tag {
  return new Tag(input)
}