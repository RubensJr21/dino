import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { base_item_value } from './base_item_value.schema';

export const installment_item_value = sqliteTable("installment_item_value", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  installments_number: t.integer("installments_number").notNull(),
  fk_id_base_item_value: t.integer("fk_id_base_item_value").references(() => base_item_value.id, {onDelete: "cascade"}).notNull()
},
)

export const installment_item_value_relations = relations(installment_item_value, ({one}) => ({
  base_item_value: one(base_item_value, {
    fields: [installment_item_value.fk_id_base_item_value],
    references: [base_item_value.id]
  })
}))