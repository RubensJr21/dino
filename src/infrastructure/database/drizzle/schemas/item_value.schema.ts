import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { base_item_value } from './base_item_value.schema';

export const item_value = sqliteTable("item_value", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  fk_id_base_item_value: t.integer("fk_id_base_item_value").references(() => base_item_value.id, {onDelete: "cascade"}).notNull()
})

export const item_value_relations = relations(item_value, ({one}) => ({
  base_item_value: one(base_item_value, {
    fields: [item_value.fk_id_base_item_value],
    references: [base_item_value.id],
  })
}))