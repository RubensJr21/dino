# Por que usar a declaração completa das relações?

## Questão: _***Eu tenho a seguinte estrutura:***_

```typescript
// tag.entity.ts
export interface Tag {
  id: number;
  description: string;
}
```

```typescript
// transfer_method_type.entity.ts
export interface TransferMethodType {
  id: number;
  name: string;
}
```

```typescript
// base_item_value.entity.ts
import { Tag } from "./tag.entity";
import { TransferMethodType } from "./transfer_method_type.entity";

export interface BaseItemValue {
  id: number;
  description: string;
  type: "Entrada" | "Saída";
  scheduled_at: Date;
  amount: number;
  was_processed: boolean;
  transfer_method_type: TransferMethodType;
  tag: Tag;
  created_at: Date;
  updated_at: Date;
}
```

```typescript
// base_item_value.schema.ts
import { relations, sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tag } from "./tag.schema";
import { transfer_method_type } from "./transfer_method_type.schema";

// Tabela de base_item_value
export const base_item_value = sqliteTable("base_item_value", {
  id: t.integer("id").primaryKey({ autoIncrement: true }),
  description: t.text("description").notNull(),
  type: t.text("type", { enum: ["Entrada", "Saída"] }).notNull(),
  scheduledAt: t
    .text("scheduled_at")
    .default(sql`(CURRENT_DATE)`)
    .notNull(),
  amount: t.real("amount").notNull(),
  wasProcessed: t.integer({ mode: "boolean" }).default(false).notNull(),
  transferMethodTypeId: t
    .integer("fk_id_transfer_method_type")
    .references(() => transfer_method_type.id)
    .notNull(),
  tagId: t
    .integer("fk_id_tag")
    .references(() => tag.id)
    .notNull(),
  createdAt: t
    .text("created_at")
    .default(sql`(CURRENT_DATE)`)
    .notNull(),
  updatedAt: t
    .text("updated_at")
    .default(sql`(CURRENT_DATE)`)
    .$onUpdate(() => sql`(CURRENT_DATE)`)
    .notNull(),
});

export const base_item_value_relations = relations(
  base_item_value,
  ({ one }) => ({
    transferMethodType: one(transfer_method_type),
    tag: one(tag),
  })
);
```

```typescript
// item_value.schema.ts
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { base_item_value } from "./base_item_value.schema";

export const item_value = sqliteTable("item_value", {
  id: t.integer("id").primaryKey({ autoIncrement: true }),
  baseItemValueId: t
    .integer("fk_id_base_item_value")
    .references(() => base_item_value.id)
    .notNull(),
});

export const item_value_relations = relations(item_value, ({ one }) => ({
  baseItemValue: one(base_item_value, {
    fields: [item_value.baseItemValueId],
    references: [base_item_value.id],
  }),
}));
```

```typescript
// item_value.drizzle.repository.ts
import { db } from "@infrastructure/database/drizzle/client";
import { BaseItemValue } from "@core/entities/base_item_value.entity";
import { ItemValue } from "@core/entities/item_value.entity";
import { eq } from "drizzle-orm/sql";
import { item_value } from "../drizzle/schemas";

type DTO_ItemValue = StrictOmit<ItemValue, "id">;

export default class ItemValueDrizzleRepository {
  public async create(data: DTO_ItemValue) {
    const value = {
      baseItemValueId: data.base_item_value.id,
    };
    const itemValues = await db.insert(item_value).values([value]).returning();
    return itemValues[0].id;
  }

  public async find(id: number) {
    const result = await db.query.item_value.findFirst({
      where: eq(item_value.id, id),
      with: {
        baseItemValue: {
          with: {
            tag: {
              columns: { id: true, description: true },
            },
            transferMethodType: {
              columns: { id: true, name: true },
            },
          },
        },
      },
    });
    if (!result) return;

    const { id: item_value_id, baseItemValue } = result;

    const base_item_value_instanced: BaseItemValue = {
      id: baseItemValue.id,
      description: baseItemValue.description,
      type: baseItemValue.type,
      scheduled_at: new Date(baseItemValue.scheduledAt),
      amount: baseItemValue.amount,
      was_processed: baseItemValue.wasProcessed,
      transfer_method_type: baseItemValue.transferMethodType,
      tag: baseItemValue.tag,
      created_at: new Date(baseItemValue.createdAt),
      updated_at: new Date(baseItemValue.updatedAt),
    };

    const item_value_instanced: ItemValue = {
      id: item_value_id,
      base_item_value: base_item_value_instanced,
    };

    return item_value_instanced;
  }

  public async findAll() {
    return db.query.item_value.findMany({
      with: {
        baseItemValue: {
          with: {
            tag: {
              columns: { description: true },
            },
            transferMethodType: {
              columns: { name: true },
            },
          },
        },
      },
    });
  }
}
```

## Problema: _***na linha 46 e 47 de item_value.drizzle.repository.ts estou recebendo um aviso de que transfer_method_type e tag não podem ser nulos. O que pode estar acontecendo?***_

## Solução

O problema está relacionado à definição das relações na sua tabela `base_item_value`. Nas suas definições de relações, você está usando:

```typescript
// base_item_value.schema.ts
export const base_item_value_relations = relations(base_item_value, ({one}) => ({
  transferMethodType: one(transfer_method_type),
  tag: one(tag),
}))
```

Você precisa especificar os campos e referências nas relações, assim como fez no `item_value_relations`. A sintaxe correta seria:

```typescript
// base_item_value.schema.ts
export const base_item_value_relations = relations(base_item_value, ({one}) => ({
  transferMethodType: one(transfer_method_type, {
    fields: [base_item_value.transferMethodTypeId],
    references: [transfer_method_type.id],
  }),
  tag: one(tag, {
    fields: [base_item_value.tagId],
    references: [tag.id],
  })
}))
```

Isso acontece porque você definiu as colunas `transferMethodTypeId` e `tagId` como `notNull()`[^1] na sua tabela `base_item_value`, mas não especificou corretamente como essas relações devem ser mapeadas nas definições de relações.

Depois de fazer essa correção, o TypeScript deve parar de mostrar os avisos de nulidade, pois as relações estarão propriamente definidas com seus campos e referências.

[^1]: SQLite column types - <https://orm.drizzle.team/docs/column-types/sqlite>
