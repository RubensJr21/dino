import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const credit_card = sqliteTable("credit_card", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  nickname: t.text("nickname").notNull(),
  last_four_digits: t.text("last_four_digits", {length: 4}).notNull(),
  limit: t.real("limit").notNull(),
  closing_date: t.text("closing_date").notNull(),
  due_date: t.text("due_date").notNull(),
  is_disabled: t.integer("is_disabled", {mode: "boolean"}).notNull(),
  created_at: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
  updated_at: t.text("updated_at").default(sql`(CURRENT_DATE)`).notNull().$onUpdate(() => sql`(CURRENT_DATE)`)
})