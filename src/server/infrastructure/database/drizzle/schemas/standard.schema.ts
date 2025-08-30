import { IItemValue } from '@domain/entities/item_value.entity';
import { IStandard } from '@domain/entities/standard.entity';
import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { item_value } from './item_value.schema';

export const standard = sqliteTable("standard", {
  id:
    t.integer("id")
      .primaryKey({ autoIncrement: true }),
  description:
    t.text("description")
      .$type<IStandard["description"]>()
      .notNull(),
  fk_id_item_value:
    t.integer("fk_id_item_value")
      .$type<IItemValue["id"]>()
      .references(() => item_value.id, { onDelete: "cascade" })
      .notNull(),
  created_at:
    t.integer("created_at", { mode: "timestamp" })
      .$type<IStandard["created_at"]>()
      .default(sql`(strftime('%s','now'))`)
      .notNull(),
  updated_at:
    t.integer("updated_at", { mode: "timestamp" })
      .$type<IStandard["updated_at"]>()
      .default(sql`(strftime('%s','now'))`)
      .$onUpdateFn(() => new Date())
      // .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
      // .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
      .notNull()
})

export const standard_relations = relations(standard, ({ one, many }) => ({
  item_value: one(item_value, {
    fields: [standard.fk_id_item_value],
    references: [item_value.id],
  })
}))