import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { bank_account_transfer_method } from './bank_account_transfer_method.schema';
import { item_value } from './item_value.schema';

export const item_value_pivot_bank_account_transfer_method = sqliteTable("item_value_pivot_bank_account_transfer_method", {
  id: t.integer("id").primaryKey(),
  fk_id_item_value: t.integer("fk_id_item_value").references(() => item_value.id).notNull(),
  fk_id_bank_account_transfer_method: t.integer("fk_id_bank_account_transfer_method").references(() => bank_account_transfer_method.id).notNull(),
})

export const item_value_pivot_bank_account_transfer_method_relations = relations(item_value_pivot_bank_account_transfer_method, ({one}) => ({
  item_value: one(item_value, {
    fields: [item_value_pivot_bank_account_transfer_method.fk_id_item_value],
    references: [item_value.id]
  }),
  bank_account_transfer_method: one(bank_account_transfer_method, {
    fields: [item_value_pivot_bank_account_transfer_method.fk_id_bank_account_transfer_method],
    references: [bank_account_transfer_method.id]
  })
}))