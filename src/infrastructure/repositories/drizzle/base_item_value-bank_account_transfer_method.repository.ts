import { BankAccountTransferMethod } from "@core/entities/bank_account_transfer_method.entity";
import IRepository from "@src/core/shared/IRepository";
import { db } from "@src/infrastructure/database/drizzle/client";
import { base_item_value_pivot_bank_account_transfer_method as base_item_pivot_bk_transfer_method } from "@src/infrastructure/database/drizzle/schemas";
import { MBaseItemValue_BankAccountTransferMethod } from "@src/infrastructure/models/base_item_value-bank_account_transfer_method.model";
import { MBaseItemValue } from "@src/infrastructure/models/base_item_value.model";
import { eq } from "drizzle-orm/sql";

export interface IRepoBaseItemValue_BankAccountTransferMethod<T extends MBaseItemValue> extends IRepository<MBaseItemValue_BankAccountTransferMethod<T>>{
  findByBaseItemValueAndBankTransferMethod(
    base_item_id: T["biv_id"],
    ba_transfer_method: BankAccountTransferMethod
  ): Promise<MBaseItemValue_BankAccountTransferMethod<T> | undefined>
}

export default class BaseItemValue_BankAccountTransferMethodDrizzleRepository<T extends MBaseItemValue> implements IRepoBaseItemValue_BankAccountTransferMethod<T> {
  async create(data: Omit<MBaseItemValue_BankAccountTransferMethod<T>, "id">): Promise<MBaseItemValue_BankAccountTransferMethod<T> | undefined> {   
    const results = await db.insert(base_item_pivot_bk_transfer_method).values(data).returning()
    if(!results) return undefined;
    return results[0]
  }

  async findById(id: number): Promise<MBaseItemValue_BankAccountTransferMethod<T> | undefined> {
    const result = await db.query.base_item_value_pivot_bank_account_transfer_method.findFirst({
      where: eq(base_item_pivot_bk_transfer_method.id, id)
    })
    if(!result) return undefined;
    return result
  }

  findByBaseItemValueAndBankTransferMethod(base_item_id: T["biv_id"], ba_transfer_method: BankAccountTransferMethod): Promise<MBaseItemValue_BankAccountTransferMethod<T> | undefined> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<MBaseItemValue_BankAccountTransferMethod<T>[]> {
    const results = await db.query.base_item_value_pivot_bank_account_transfer_method.findMany()
    return results
  }

  async update(id: number, data: Omit<MBaseItemValue_BankAccountTransferMethod<T>, "id">): Promise<MBaseItemValue_BankAccountTransferMethod<T> | undefined> {
    const results = await db.update(base_item_pivot_bk_transfer_method).set(data).where(
      eq(base_item_pivot_bk_transfer_method.id, id)
    ).returning()
    if(!results) return undefined;
    return this.findById(id)
  }
  async delete(id: number): Promise<boolean> {
    const result = await db.delete(base_item_pivot_bk_transfer_method).where(
      eq(base_item_pivot_bk_transfer_method.id, id)
    ).returning()
    if(!result) return false;         
    return true;
  }
}