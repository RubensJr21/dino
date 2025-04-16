import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { base_item_value } from './base_item_value.schema';
import { recurrence_type } from './recurrence_type.schema';

export const recurring_item_value = sqliteTable("recurring_item_value", {
    id: t.integer("id").primaryKey({autoIncrement: true}),
    isDisabled: t.integer("is_disabled", {mode: "boolean"}).notNull(),
    recurrenceTypeId: t.integer("fk_id_recurrence_type").references(() => recurrence_type.id).notNull(),
    baseItemValueId: t.integer("fk_id_base_item_value").references(() => base_item_value.id, {onDelete: "cascade"}).notNull()
})

export const recurring_item_value_relations = relations(recurring_item_value, ({one}) => ({
    recurrenceType: one(recurrence_type, {
        fields: [recurring_item_value.recurrenceTypeId],
        references: [recurrence_type.id]
    }),
    baseItemValue: one(base_item_value, {
        fields: [recurring_item_value.baseItemValueId],
        references: [base_item_value.id]
    })
}))