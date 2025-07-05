import { IInstallment } from '@src/core/entities/installment.entity';
import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const installment = sqliteTable("installment", {
  id: 
    t.integer("id")
     .primaryKey({ autoIncrement: true }),
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
     .default(sql`(date('now','localtime'))`)
     .$type<IInstallment["created_at"]>()
     .notNull(),
  updated_at: 
    t.integer("updated_at", { mode: "timestamp" })
     .default(sql`(date('now','localtime'))`)
     .$onUpdate(() => sql`(date('now','localtime'))`)
     .$type<IInstallment["updated_at"]>()
     .notNull()
})