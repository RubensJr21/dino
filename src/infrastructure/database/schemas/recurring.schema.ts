import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { recurrence_type } from './recurrence_type.schema';

export const recurring = sqliteTable("recurring", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  is_disabled: t.integer("is_disabled", { mode: "boolean" }).notNull(),
  current_amount: t.real("current_amount").notNull(),
  fk_id_recurrence_type: t.integer("fk_id_recurrence_type").references(() => recurrence_type.id).notNull(),
  created_at: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
  updated_at: t.text("updated_at").default(sql`(CURRENT_DATE)`).notNull().$onUpdate(() => sql`(CURRENT_DATE)`)
})

export const recurring_relations = relations(recurring, ({one}) => ({
  recurrence_type: one(recurrence_type, {
    fields: [recurring.fk_id_recurrence_type],
    references: [recurrence_type.id]
  })
}))