import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { bank_account } from './bank_account.schema';

export const bank_account_transfer_method = sqliteTable("bank_account_transfer_method", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  type: t.text("type").notNull(),
  is_enable: t.integer("is_enable", {mode: 'boolean'}).notNull(),
  fk_id_bank_account: t.integer("fk_id_bank_account").references(() => bank_account.id).notNull(),
  created_at: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
  updated_at: t.text("updated_at").default(sql`(CURRENT_DATE)`).$onUpdate(() => sql`(CURRENT_DATE)`).notNull()
})

export const bank_account_transfer_method_relations = relations(bank_account_transfer_method, ({one}) => ({
  bank_account: one(bank_account, {
    fields: [bank_account_transfer_method.fk_id_bank_account],
    references: [bank_account.id]
  })
}))