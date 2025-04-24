import { db } from "@infrastructure/database/drizzle/client";
import IRepository from "@src/core/shared/IRepository";
import { bank_account } from "@src/infrastructure/database/drizzle/schemas";
import { MBankAccount } from "@src/infrastructure/models/bank_account.model";
import { eq } from "drizzle-orm/sql";

type MBankAccountWithoutAts = StrictOmit<MBankAccount, "created_at" | "updated_at">

interface MBankAccountOutput extends MBankAccountWithoutAts {
  created_at: string;
  updated_at: string;
}
export interface IRepoBankAccount extends IRepository<MBankAccount> {
  findByNickname(nickname: string): Promise<MBankAccount | undefined>
}

export default class BankAccountDrizzleRepository implements IRepoBankAccount {
  private formatOutput(output: MBankAccountOutput): MBankAccount{
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at)
    }
  }

  async create(data: StrictOmit<MBankAccountWithoutAts, "id">): Promise<MBankAccount | undefined> {
    const results = await db.insert(bank_account).values(data).returning()
    if(!results) return;
    return this.formatOutput(results[0])
  }

  async findById(id: number): Promise<MBankAccount | undefined> {
    const result = await db.query.bank_account.findFirst({
      where: eq(bank_account.id, id)
    })
    if(!result) return;
    return this.formatOutput(result)
  }

  async findByNickname(nickname: string): Promise<MBankAccount | undefined> {
    const result = await db.query.bank_account.findFirst({where: eq(bank_account.nickname, nickname)})
    if(!result) return;
    return this.formatOutput(result)
  }

  async findAll(): Promise<MBankAccount[]> {
    const results = await db.query.bank_account.findMany()
    return results.map(this.formatOutput)
  }

  async update(id: MBankAccount["id"], data: StrictOmit<MBankAccountWithoutAts, "id">): Promise<MBankAccount | undefined> {
    const results = await db.update(bank_account).set(data).where(
      eq(bank_account.id, id)
    ).returning()
    if(!results) return;
    return this.findById(id)

  }
  async delete(id: number): Promise<boolean> {
    const results = await db.delete(bank_account).where(
      eq(bank_account.id, id)
    ).returning()
    if(!results) return false;
    return true
  }
}