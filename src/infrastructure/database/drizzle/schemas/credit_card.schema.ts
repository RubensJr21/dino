import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const credit_card = sqliteTable("credit_card", {
    id: t.integer("id").primaryKey({autoIncrement: true}),
    nickname: t.text("nickname").notNull(),
    lastFourDigits: t.text("last_four_digits", {length: 4}).notNull(),
    limit: t.real("limit").notNull(),
    closingDate: t.text("closing_date").notNull(),
    dueDate: t.text("due_date").notNull(),
    isDisabled: t.integer("is_disabled", {mode: "boolean"}).notNull(),
    createdAt: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
    updatedAt: t.text("updated_at").default(sql`(CURRENT_DATE)`).notNull().$onUpdate(() => sql`(CURRENT_DATE)`)
})