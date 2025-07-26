import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { bank_account } from './bank_account.schema';
import { transfer_method } from './transfer_method.schema';

export const bank_account_transfer_method = sqliteTable("bank_account_transfer_method", {
  id: 
    t.integer("id")
     .primaryKey({autoIncrement: true}),
  is_disabled: 
      t.integer("is_disabled", { mode: 'boolean' })
       .notNull(),
  fk_id_bank_account: 
    t.integer("fk_id_bank_account")
     .references(() => bank_account.id, { onDelete: "cascade" })
     .notNull(),
  fk_id_transfer_method: 
    t.integer("fk_id_transfer_method")
     .references(() => transfer_method.id, { onDelete: "cascade" })
     .notNull(),
  created_at: 
    t.integer("created_at", { mode: "timestamp" })
     .default(sql`(date('now','localtime'))`)
     .notNull(),
  updated_at: 
    t.integer("updated_at", { mode: "timestamp" })
     .default(sql`(date('now','localtime'))`)
     .$onUpdate(() => sql`(date('now','localtime'))`)
     .notNull()
})

export const bank_account_transfer_method_relations = relations(bank_account_transfer_method, ({one}) => ({
  bank_account: one(bank_account, {
    fields: [bank_account_transfer_method.fk_id_bank_account],
    references: [bank_account.id]
  }),
  transfer_method: one(transfer_method, {
    fields: [bank_account_transfer_method.fk_id_transfer_method],
    references: [transfer_method.id]
  })
}))