import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const recurrence_type = sqliteTable("recurrence_type", {
    id: t.integer("id").primaryKey({autoIncrement: true}),
    type: t.text("type").unique().notNull()
})