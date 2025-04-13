import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const bank_account = sqliteTable("bank_account", {
    id: t.integer("id").primaryKey({autoIncrement: true}),
    nickname: t.text("nickname").notNull(),
    isDisabled: t.integer({mode: "boolean"}).notNull(),
    balance: t.real("balance").notNull(),
    createdAt: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
    updatedAt: t.text("updated_at").default(sql`(CURRENT_DATE)`).notNull().$onUpdate(() => sql`(CURRENT_DATE)`)
})