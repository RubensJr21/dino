import { BankAccount } from "@core/entities/bank_account.entity";
import IRepository from "@src/core/shared/IRepository";
import { db } from "@src/infrastructure/database/drizzle/client";
import { bank_account_transfer_method } from "@src/infrastructure/database/drizzle/schemas";
import { MBankAccountTransferMethod } from "@src/infrastructure/models/bank_account_transfer_method.model";
import { eq } from "drizzle-orm/sql";

type MBankAccountTransferMethodWithoutDate = StrictOmit<MBankAccountTransferMethod, "created_at" | "updated_at">

interface MBankAccountTransferMethodOutput extends MBankAccountTransferMethodWithoutDate {
  created_at: string;
  updated_at: string;
}

interface IRepoBankAccountTransferMethod extends IRepository<MBankAccountTransferMethod> {
  findByBankAccountAndType(bank_account_id: BankAccount["id"], type: string): Promise<MBankAccountTransferMethod | undefined>
}

export default class BankAccountTransferMethodDrizzleRepository implements IRepoBankAccountTransferMethod {
  private formatOutput(output: MBankAccountTransferMethodOutput): MBankAccountTransferMethod {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at)
    }
  }
  
  public async create(data: StrictOmit<MBankAccountTransferMethodWithoutDate, "id">): Promise<MBankAccountTransferMethod | undefined> {   
    const results = await db.insert(bank_account_transfer_method).values(data).returning()

    if(!results) return undefined;
    
    return this.formatOutput(results[0])
  }
  public async findById(id: number): Promise<MBankAccountTransferMethod | undefined> {
    const result = await db.query.bank_account_transfer_method.findFirst({
      where: eq(bank_account_transfer_method.id, id)
    })
    if(!result) return;
    return this.formatOutput(result)
  }

  findByBankAccountAndType(bank_account_id: BankAccount["id"], type: string): Promise<MBankAccountTransferMethod | undefined> {
    throw new Error("Method not implemented.");
  }

  public async findAll(): Promise<MBankAccountTransferMethod[]> {
    const results = await db.query.bank_account_transfer_method.findMany()
    return results.map(this.formatOutput)
  }
  public async update(id: number, data: StrictOmit<MBankAccountTransferMethodWithoutDate, "id">): Promise<MBankAccountTransferMethod | undefined> {    
    const results = await db.update(bank_account_transfer_method).set(data).where(eq(bank_account_transfer_method.id, id)).returning()
    if(!results) return undefined;
    return this.findById(id)
  }
  public async delete(id: number): Promise<boolean> {
    const result = await db.delete(bank_account_transfer_method).where(eq(bank_account_transfer_method.id, id)).returning()
    if(!result) return false;
    return true;
  }
}