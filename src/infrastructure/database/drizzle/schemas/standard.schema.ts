import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { item_value } from './item_value.schema';

export const standard = sqliteTable("standard", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  fk_id_item_value: t.integer("fk_id_item_value").references(() => item_value.id, {onDelete: "cascade"}).notNull(),
  created_at: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
  updated_at: t.text("updated_at").default(sql`(CURRENT_DATE)`).notNull().$onUpdate(() => sql`(CURRENT_DATE)`)
})

export const standard_relations = relations(standard, ({one}) => ({
  item_value: one(item_value, {
    fields: [standard.fk_id_item_value],
    references: [item_value.id],
  })
}))