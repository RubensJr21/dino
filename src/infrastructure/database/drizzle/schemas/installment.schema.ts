import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const installment = sqliteTable("installment", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  installments_number: t.integer("installments_number").notNull(),
  total_amount: t.real("total_amount").notNull(),
  created_at: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
  updated_at: t.text("updated_at").default(sql`(CURRENT_DATE)`).$onUpdate(() => sql`(CURRENT_DATE)`).notNull()
})