import { IItemValue } from '@src/core/entities/item_value.entity';
import { ITag } from '@src/core/entities/tag.entity';
import { ITransferMethod } from '@src/core/entities/transfer_method.entity';
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
      .$type<IItemValue["description"]>()
      .notNull(),
  cashflow_type:
    t.integer("cashflow_type")
      .$type<IItemValue["cashflow_type"]>()
      .notNull(),
  scheduled_at:
    t.integer("scheduled_at", { mode: "timestamp" })
      .$type<IItemValue["scheduled_at"]>()
      .notNull(),
  // Guardado em centavos para garantir que o cálculo será feito corretamente
  amount:
    t.integer("amount")
      .$type<IItemValue["amount"]>()
      .notNull(),
  was_processed:
    t.integer({ mode: 'boolean' })
      .$type<IItemValue["was_processed"]>()
      .notNull(),
  fk_id_transfer_method:
    t.integer("fk_id_transfer_method")
      .$type<ITransferMethod["id"]>()
      .references(() => transfer_method.id)
      .notNull(),
  fk_id_tag:
    t.integer("fk_id_tag")
      .$type<ITag["id"]>()
      .references(() => tag.id)
      .notNull(),
  created_at:
    t.integer("created_at", { mode: "timestamp" })
      .default(sql`(strftime('%s','now'))`)
      .$type<IItemValue["created_at"]>()
      .notNull(),
  updated_at:
    t.integer("updated_at", { mode: "timestamp" })
      .default(sql`(strftime('%s','now'))`)
      .$onUpdateFn(() => new Date())
      // .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
      .$type<IItemValue["updated_at"]>()
      .notNull()
});

export const item_value_relations = relations(item_value, ({ one }) => ({
  transfer_method: one(transfer_method, {
    fields: [item_value.fk_id_transfer_method],
    references: [transfer_method.id]
  }),
  tag: one(tag, {
    fields: [item_value.fk_id_tag],
    references: [tag.id]
  }),
}))