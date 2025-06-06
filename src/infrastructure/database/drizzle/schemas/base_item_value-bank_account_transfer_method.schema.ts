import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { bank_account_transfer_method } from './bank_account_transfer_method.schema';
import { base_item_value } from './base_item_value.schema';

export const base_item_value_pivot_bank_account_transfer_method = sqliteTable("base_item_value_pivot_bank_account_transfer_method", {
  id: t.integer("id").primaryKey(),
  fk_id_base_item_value: t.integer("fk_id_base_item_value").references(() => base_item_value.id).notNull(),
  fk_id_bank_account_transfer_method: t.integer("fk_id_bank_account_transfer_method").references(() => bank_account_transfer_method.id).notNull(),
})

export const base_item_value_pivot_bank_account_transfer_method_relations = relations(base_item_value_pivot_bank_account_transfer_method, ({one}) => ({
  base_item_value: one(base_item_value, {
    fields: [base_item_value_pivot_bank_account_transfer_method.fk_id_base_item_value],
    references: [base_item_value.id]
  }),
  bank_account_transfer_method: one(bank_account_transfer_method, {
    fields: [base_item_value_pivot_bank_account_transfer_method.fk_id_bank_account_transfer_method],
    references: [bank_account_transfer_method.id]
  })
}))