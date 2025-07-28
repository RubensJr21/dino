import { MItemValue } from '@src/core/models/item_value.model';
import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tag } from './tag.schema';
import { transfer_method } from './transfer_method.schema';

// Tabela de item_value
export const item_value = sqliteTable("item_value", {
  id: 
    t.integer("id")
     .primaryKey({ autoIncrement: true }),
  description: 
    t.text("description")
     .$type<MItemValue["description"]>()
     .notNull(),
  cashflow_type: 
    t.integer("cashflow_type")
     .$type<MItemValue["cashflow_type"]>()
     .notNull(),
  scheduled_at: 
    t.integer("scheduled_at", { mode: "timestamp" })
     .$type<MItemValue["scheduled_at"]>()
     .notNull(),
  // Guardado em centavos para garantir que o cálculo será feito corretamente
  amount: 
    t.integer("amount")
     .$type<MItemValue["amount"]>()
     .notNull(),
  was_processed: 
    t.integer({ mode: 'boolean' })
     .$type<MItemValue["was_processed"]>()
     .notNull(),
  fk_id_transfer_method: 
    t.integer("fk_id_transfer_method")
     .$type<MItemValue["fk_id_transfer_method"]>()
     .references(() => transfer_method.id)
     .notNull(),
  fk_id_tag: 
     t.integer("fk_id_tag")
     .$type<MItemValue["fk_id_tag"]>()
     .references(() => tag.id)
     .notNull(),
  created_at: 
    t.integer("created_at", { mode: "timestamp" })
     .default(sql`(date('now','localtime'))`)
     .$type<MItemValue["created_at"]>()
     .notNull(),
  updated_at: 
    t.integer("updated_at", { mode: "timestamp" })
     .default(sql`(date('now','localtime'))`)
     .$onUpdate(() => sql`(date('now','localtime'))`)
     .$type<MItemValue["updated_at"]>()
     .notNull()
});

export const item_value_relations = relations(item_value, ({one}) => ({
  transfer_method: one(transfer_method, {
    fields: [item_value.fk_id_transfer_method],
    references: [transfer_method.id]
  }),
  tag: one(tag, {
    fields: [item_value.fk_id_tag],
    references: [tag.id]
  }),
}))