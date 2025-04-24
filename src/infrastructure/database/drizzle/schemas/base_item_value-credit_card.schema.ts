import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { base_item_value } from './base_item_value.schema';
import { credit_card } from './credit_card.schema';

export const base_item_value_pivot_credit_card = sqliteTable("base_item_value_pivot_credit_card", {
    id: t.integer("id").primaryKey(),
    base_item_value_id: t.integer("fk_id_base_item_value").references(() => base_item_value.id).notNull(),
    credit_card_id: t.integer("fk_id_credit_card").references(() => credit_card.id).notNull(),
})

export const base_item_value_pivot_credit_card_relations = relations(base_item_value_pivot_credit_card, ({one}) => ({
  base_item_value: one(base_item_value, {
    fields: [base_item_value_pivot_credit_card.base_item_value_id],
    references: [base_item_value.id]
  }),
  credit_card: one(credit_card, {
    fields: [base_item_value_pivot_credit_card.credit_card_id],
    references: [credit_card.id]
  })
}))