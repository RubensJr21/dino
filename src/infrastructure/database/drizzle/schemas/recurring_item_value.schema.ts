import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { base_item_value } from './base_item_value.schema';
import { recurrence_type } from './recurrence_type.schema';

export const recurring_item_value = sqliteTable("recurring_item_value", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  is_disabled: t.integer("is_disabled", {mode: "boolean"}).notNull(),
  recurrence_type_id: t.integer("fk_id_recurrence_type").references(() => recurrence_type.id).notNull(),
  base_item_value_id: t.integer("fk_id_base_item_value").references(() => base_item_value.id, {onDelete: "cascade"}).notNull()
})

export const recurring_item_value_relations = relations(recurring_item_value, ({one}) => ({
  recurrence_type: one(recurrence_type, {
    fields: [recurring_item_value.recurrence_type_id],
    references: [recurrence_type.id]
  }),
  base_item_value: one(base_item_value, {
    fields: [recurring_item_value.base_item_value_id],
    references: [base_item_value.id]
  })
}))