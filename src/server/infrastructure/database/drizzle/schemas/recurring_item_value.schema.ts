import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { item_value } from './item_value.schema';
import { recurring } from './recurring.schema';

export const recurring_item_value = sqliteTable("recurring_item_value", {
  id: 
    t.integer("id")
     .primaryKey({autoIncrement: true}),
  fk_id_recurring: 
    t.integer("fk_id_recurring")
     .references(() => recurring.id, { onDelete: "cascade" })
     .notNull(),
  fk_id_item_value: 
    t.integer("fk_id_item_value")
     .references(() => item_value.id, {onDelete: "cascade"})
     .notNull()
})

export const recurring_item_value_relations = relations(recurring_item_value, ({one, many}) => ({
  item_value: one(item_value, {
    fields: [recurring_item_value.fk_id_item_value],
    references: [item_value.id]
  }),
  recurring: one(recurring, {
    fields: [recurring_item_value.fk_id_recurring],
    references: [recurring.id]
  })
}))