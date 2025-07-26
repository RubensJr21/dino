import { TypeOfTransferMethods } from '@src/core/shared/types/transfer_methods';
import * as t from 'drizzle-orm/sqlite-core';
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const transfer_method = sqliteTable("transfer_method", {
  id: 
    t.integer("id")
     .primaryKey({autoIncrement: true}),
  method: 
    t.text("method")
     .$type<TypeOfTransferMethods>()
     .unique()
     .notNull(),
}) 