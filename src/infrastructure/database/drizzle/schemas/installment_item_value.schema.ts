import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { installment } from './installment.schema';
import { item_value } from './item_value.schema';

export const installment_item_value = sqliteTable("installment_item_value", {
  id: t.integer("id").primaryKey({autoIncrement: true}),
  fk_id_installment: t.integer("fk_id_installment").references(() => installment.id).notNull(),
  fk_id_item_value: t.integer("fk_id_item_value").references(() => item_value.id, {onDelete: "cascade"}).notNull()
})

export const installment_item_value_relations = relations(installment_item_value, ({one, many}) => ({
  item_value: one(item_value, {
    fields: [installment_item_value.fk_id_item_value],
    references: [item_value.id]
  }),
  installment: one(installment, {
    fields: [installment_item_value.fk_id_installment],
    references: [installment.id]
  })
}))