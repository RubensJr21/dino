import { IBaseItemValue } from "@core/entities/base_item_value.entity";
import { CreditCard } from "@core/entities/credit_card.entity";
import IRepository from "@src/core/shared/IRepository";
import { db } from "@src/infrastructure/database/drizzle/client";
import { base_item_value_pivot_credit_card } from "@src/infrastructure/database/drizzle/schemas";
import { MBaseItemValue_CreditCard } from "@src/infrastructure/models/base_item_value-credit_card.model";
import { MBaseItemValue } from "@src/infrastructure/models/base_item_value.model";
import { eq } from "drizzle-orm/sql";

export interface IRepoBaseItemValue_CreditCard<T extends MBaseItemValue> extends IRepository<MBaseItemValue_CreditCard<T>> {
  findByBaseItemValueAndBankTransferMethod(
    base_item_id: IBaseItemValue["biv_id"],
    credit_card_id: CreditCard["id"]
  ): Promise<MBaseItemValue_CreditCard<T> | undefined>
}

export default class BaseItemValue_CreditCardDrizzleRepository<T extends MBaseItemValue> implements IRepoBaseItemValue_CreditCard<T> {
  async create(data: Omit<MBaseItemValue_CreditCard<T>, "id">): Promise<MBaseItemValue_CreditCard<T> | undefined> {
    const results = await db.insert(base_item_value_pivot_credit_card).values(data).returning()
    if(!results) return undefined;
    return results[0]
  }

  async findById(id: number): Promise<MBaseItemValue_CreditCard<T> | undefined> {
    const result = await db.query.base_item_value_pivot_credit_card.findFirst({
      where: eq(base_item_value_pivot_credit_card.id, id)
    })
    if(!result) return undefined;
    
    return result;
  }

  async findByBaseItemValueAndBankTransferMethod(base_item_id: IBaseItemValue["biv_id"], credit_card_id: CreditCard["id"]): Promise<MBaseItemValue_CreditCard<T> | undefined> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<MBaseItemValue_CreditCard<T>[]> {
    const results = await db.query.base_item_value_pivot_credit_card.findMany()
    return results
  }

  async update(id: number, data: Omit<MBaseItemValue_CreditCard<T>, "id">): Promise<MBaseItemValue_CreditCard<T> | undefined> {
    const results = await db.update(base_item_value_pivot_credit_card).set(data).where(
      eq(base_item_value_pivot_credit_card.id, id)
    ).returning()
    if(!results) return undefined;
    return this.findById(id)
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.delete(base_item_value_pivot_credit_card).where(
      eq(base_item_value_pivot_credit_card.id, id)
    ).returning()
    if(!result) return false;         
    return true;
  }
}