import { IBankAccount } from '@domain/entities/bank_account.entity';
import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const bank_account = sqliteTable("bank_account", {
  id:
    t.integer("id")
      .primaryKey({ autoIncrement: true }),
  nickname:
    t.text("nickname")
      .$type<IBankAccount["nickname"]>()
      .notNull(),
  is_disabled:
    t.integer("is_disabled")
      // .$type<IBankAccount["is_disabled"]>()
      .notNull(),
  balance:
    t.integer("balance")
      .$type<IBankAccount["balance"]>()
      .notNull(),
  created_at:
    t.integer("created_at", { mode: "timestamp" })
      .default(sql`(strftime('%s','now'))`)
      .$type<IBankAccount["created_at"]>()
      .notNull(),
  updated_at:
    t.integer("updated_at", { mode: "timestamp" })
      .default(sql`(strftime('%s','now'))`)
      .$onUpdateFn(() => new Date())
      // .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
      .$type<IBankAccount["updated_at"]>()
      .notNull()
})