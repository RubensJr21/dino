import { IBankAccount } from '@src/core/entities/bank_account.entity';
import { IBankAccountTransferMethod } from '@src/core/entities/bank_account_transfer_method.entity';
import { ITransferMethod } from '@src/core/entities/transfer_method.entity';
import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { bank_account } from './bank_account.schema';
import { transfer_method } from './transfer_method.schema';

export const bank_account_transfer_method = sqliteTable("bank_account_transfer_method", {
  id:
    t.integer("id")
      .primaryKey({ autoIncrement: true }),
  is_disabled:
    t.integer("is_disabled")
      // .$type<IBankAccountTransferMethod["is_disabled"]>()
      .notNull(),
  fk_id_bank_account:
    t.integer("fk_id_bank_account")
      .$type<IBankAccount["id"]>()
      .references(() => bank_account.id, { onDelete: "cascade" })
      .notNull(),
  fk_id_transfer_method:
    t.integer("fk_id_transfer_method")
      .$type<ITransferMethod["id"]>()
      .references(() => transfer_method.id, { onDelete: "cascade" })
      .notNull(),
  created_at:
    t.integer("created_at", { mode: "timestamp" })
      .$type<IBankAccountTransferMethod["created_at"]>()
      .default(sql`(strftime('%s','now'))`)
      .notNull(),
  updated_at:
    t.integer("updated_at", { mode: "timestamp" })
      .$type<IBankAccountTransferMethod["updated_at"]>()
      .default(sql`(strftime('%s','now'))`)
      .$onUpdateFn(() => new Date())
      // .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
      .notNull()
})

export const bank_account_transfer_method_relations = relations(bank_account_transfer_method, ({ one }) => ({
  bank_account: one(bank_account, {
    fields: [bank_account_transfer_method.fk_id_bank_account],
    references: [bank_account.id]
  }),
  transfer_method: one(transfer_method, {
    fields: [bank_account_transfer_method.fk_id_transfer_method],
    references: [transfer_method.id]
  })
}))