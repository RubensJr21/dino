import { IRecurring } from '@src/core/entities/recurring.entity';
import { MItemValue } from '@src/core/models/item_value.model';
import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { recurrence_type } from './recurrence_type.schema';
import { tag } from './tag.schema';
import { transfer_method } from './transfer_method.schema';

export const recurring = sqliteTable("recurring", {
  id:
    t.integer("id")
      .primaryKey({ autoIncrement: true }),
  is_disabled:
    t.integer("is_disabled")
      .$type<IRecurring["is_disabled"]>()
      .notNull(),
  start_date:
    t.integer("start_date", { mode: "timestamp" })
      .$type<IRecurring["start_date"]>()
      .notNull(),
  end_date:
    t.integer("end_date", { mode: "timestamp" }),
  // Guardado em centavos para garantir que o cálculo será feito corretamente
  current_amount:
    t.integer("current_amount")
      .$type<IRecurring["current_amount"]>()
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
  fk_id_recurrence_type:
    t.integer("fk_id_recurrence_type")
      .references(() => recurrence_type.id)
      .notNull(),
  created_at:
    t.integer("created_at", { mode: "timestamp" })
      .default(sql`(date('now','localtime'))`)
      .$type<IRecurring["created_at"]>()
      .notNull(),
  updated_at:
    t.integer("updated_at", { mode: "timestamp" })
      .default(sql`(date('now','localtime'))`)
      .$onUpdate(() => sql`(date('now','localtime'))`)
      .$type<IRecurring["updated_at"]>()
      .notNull()
})

export const recurring_relations = relations(recurring, ({ one }) => ({
  transfer_method: one(transfer_method, {
    fields: [recurring.fk_id_transfer_method],
    references: [transfer_method.id]
  }),
  tag: one(tag, {
    fields: [recurring.fk_id_tag],
    references: [tag.id]
  }),
  recurrence_type: one(recurrence_type, {
    fields: [recurring.fk_id_recurrence_type],
    references: [recurrence_type.id]
  })
}))