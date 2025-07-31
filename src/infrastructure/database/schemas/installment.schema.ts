import { MInstallment } from '@src/core/models/installment.model';
import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tag } from './tag.schema';
import { transfer_method } from './transfer_method.schema';

export const installment = sqliteTable("installment", {
  id: 
    t.integer("id")
     .$type<MInstallment["id"]>()
     .primaryKey({ autoIncrement: true }),
  description:
    t.text("description")
    .$type<MInstallment["description"]>()
    .notNull(),
  fk_id_transfer_method: 
    t.integer("fk_id_transfer_method")
      .$type<MInstallment["fk_id_transfer_method"]>()
      .references(() => transfer_method.id)
      .notNull(),
  fk_id_tag: 
      t.integer("fk_id_tag")
      .$type<MInstallment["fk_id_tag"]>()
      .references(() => tag.id)
      .notNull(),
  start_date: 
    t.integer("start_date", { mode: "timestamp" })
     .$type<MInstallment["start_date"]>()
     .notNull(),
  installments_number: 
    t.integer("installments_number")
     .$type<MInstallment["installments_number"]>()
     .notNull(),
  // Guardado em centavos para garantir que o cálculo será feito corretamente
  total_amount: 
    t.integer("total_amount")
     .$type<MInstallment["total_amount"]>()
     .notNull(),
  created_at: 
    t.integer("created_at", { mode: "timestamp" })
     .default(sql`(strftime('%s','now'))`)
     .$type<MInstallment["created_at"]>()
     .notNull(),
  updated_at: 
    t.integer("updated_at", { mode: "timestamp" })
     .default(sql`(strftime('%s','now'))`)
     .$onUpdate(() => sql`(strftime('%s','now'))`)
     .$type<MInstallment["updated_at"]>()
     .notNull()
})

export const installment_relations = relations(installment, ({one}) => ({
  transfer_method: one(transfer_method, {
    fields: [installment.fk_id_transfer_method],
    references: [transfer_method.id]
  }),
  tag: one(tag, {
    fields: [installment.fk_id_tag],
    references: [tag.id]
  }),
}))