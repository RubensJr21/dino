import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tag } from './tag.schema';
import { transfer_method_type } from './transfer_method_type.schema';

// Tabela de base_item_value
export const base_item_value = sqliteTable("base_item_value", {
    id: t.integer("id").primaryKey({ autoIncrement: true }),
    description: t.text("description").notNull(),
    type: t.text("type").notNull(),
    scheduledAt: t.text("scheduled_at").notNull(),
    amount: t.real("amount").notNull(),
    wasProcessed: t.integer({mode: 'boolean'}).notNull(),
    transferMethodTypeId: t.integer("fk_id_transfer_method_type").references(() => transfer_method_type.id).notNull(),
    tagId: t.integer("fk_id_tag").references(() => tag.id).notNull(),
    createdAt: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
    updatedAt: t.text("updated_at").default(sql`(CURRENT_DATE)`).$onUpdate(() => sql`(CURRENT_DATE)`).notNull()
});

export const base_item_value_relations = relations(base_item_value, ({one}) => ({
    transferMethodType: one(transfer_method_type, {
        fields: [base_item_value.transferMethodTypeId],
        references: [transfer_method_type.id]
    }),
    tag: one(tag, {
        fields: [base_item_value.tagId],
        references: [tag.id]
    }),
}))