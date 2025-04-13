import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { bank_account } from './bank_account.schema';

export const bank_account_transfer_method = sqliteTable("bank_account_transfer_method", {
    id: t.integer("id").primaryKey({autoIncrement: true}),
    type: t.text("type").notNull(),
    bankAccountId: t.integer("fk_id_bank_account").references(() => bank_account.id).notNull(),
    createdAt: t.text("created_at").default(sql`(CURRENT_DATE)`).notNull(),
    updatedAt: t.text("updated_at").default(sql`(CURRENT_DATE)`).$onUpdate(() => sql`(CURRENT_DATE)`).notNull()
})

export const bank_account_transfer_method_relations = relations(bank_account_transfer_method, ({one}) => ({
    bankAccount: one(bank_account, {
        fields: [bank_account_transfer_method.bankAccountId],
        references: [bank_account.id]
    })
}))