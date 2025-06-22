import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const transfer_method = sqliteTable("transfer_method", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  nickname: t.text("nickname").notNull(),
  is_disabled: t.integer("is_disabled", { mode: 'boolean' }).notNull(),
  created_at: t.integer("created_at", { mode: "timestamp" }).default(sql`(date('now','localtime'))`).notNull(),
  updated_at: t.integer("updated_at", { mode: "timestamp" }).default(sql`(date('now','localtime'))`).$onUpdate(() => sql`(date('now','localtime'))`).notNull()
}) 