import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { base_item_value } from './base_item_value.schema';

export const item_value = sqliteTable("item_value", {
    id: t.integer("id").primaryKey({autoIncrement: true}),
    baseItemValueId: t.integer("fk_id_base_item_value").references(() => base_item_value.id, {onDelete: "cascade"}).notNull()
})

export const item_value_relations = relations(item_value, ({one}) => ({
    baseItemValue: one(base_item_value, {
        fields: [item_value.baseItemValueId],
        references: [base_item_value.id],
    })
}))