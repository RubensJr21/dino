import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { recurrence_type } from './recurrence_type.schema';

export const recurring = sqliteTable("recurring", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  start_date: t.integer("start_date", { mode: "timestamp" }).notNull(),
  end_date: t.integer("end_date", { mode: "timestamp" }),
  // Guardado em centavos para garantir que o cálculo será feito corretamente
  current_amount: t.integer("current_amount").notNull(),
  fk_id_recurrence_type: t.integer("fk_id_recurrence_type").references(() => recurrence_type.id).notNull(),
  created_at: t.integer("created_at", { mode: "timestamp" }).default(sql`(date('now','localtime'))`).notNull(),
  updated_at: t.integer("updated_at", { mode: "timestamp" }).default(sql`(date('now','localtime'))`).notNull().$onUpdate(() => sql`(date('now','localtime'))`)
})

export const recurring_relations = relations(recurring, ({one}) => ({
  recurrence_type: one(recurrence_type, {
    fields: [recurring.fk_id_recurrence_type],
    references: [recurrence_type.id]
  })
}))