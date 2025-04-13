import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const transfer_method_type = sqliteTable("transfer_method_type", {
    id: t.integer("id").primaryKey({autoIncrement: true}),
    name: t.text("name").notNull()
}) 