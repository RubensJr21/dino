import { ITag } from '@src/core/entities/tag.entity';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const tag = sqliteTable("tag", {
  id: 
    t.integer("id")
     .primaryKey({autoIncrement: true}),
  description: 
    t.text("description")
     .$type<ITag["description"]>()
     .notNull()
})