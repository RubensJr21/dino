import { IInstallment } from '@domain/entities/installment.entity';
import { ITag } from '@domain/entities/tag.entity';
import { ITransferMethod } from '@domain/entities/transfer_method.entity';
import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tag } from './tag.schema';
import { transfer_method } from './transfer_method.schema';

export const installment = sqliteTable("installment", {
  id:
    t.integer("id")
      .$type<IInstallment["id"]>()
      .primaryKey({ autoIncrement: true }),
  description:
    t.text("description")
      .$type<IInstallment["description"]>()
      .notNull(),
  fk_id_transfer_method:
    t.integer("fk_id_transfer_method")
      .$type<ITransferMethod["id"]>()
      .references(() => transfer_method.id)
      .notNull(),
  fk_id_tag:
    t.integer("fk_id_tag")
      .$type<ITag["id"]>()
      .references(() => tag.id)
      .notNull(),
  start_date:
    t.integer("start_date", { mode: "timestamp" })
      .$type<IInstallment["start_date"]>()
      .notNull(),
  installments_number:
    t.integer("installments_number")
      .$type<IInstallment["installments_number"]>()
      .notNull(),
  // Guardado em centavos para garantir que o cálculo será feito corretamente
  total_amount:
    t.integer("total_amount")
      .$type<IInstallment["total_amount"]>()
      .notNull(),
  created_at:
    t.integer("created_at", { mode: "timestamp" })
      .default(sql`(strftime('%s','now'))`)
      .$type<IInstallment["created_at"]>()
      .notNull(),
  updated_at:
    t.integer("updated_at", { mode: "timestamp" })
      .default(sql`(strftime('%s','now'))`)
      .$onUpdateFn(() => new Date())
      // .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
      .$type<IInstallment["updated_at"]>()
      .notNull()
})

export const installment_relations = relations(installment, ({ one }) => ({
  transfer_method: one(transfer_method, {
    fields: [installment.fk_id_transfer_method],
    references: [transfer_method.id]
  }),
  tag: one(tag, {
    fields: [installment.fk_id_tag],
    references: [tag.id]
  }),
}))