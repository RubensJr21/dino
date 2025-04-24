import { db } from '@infrastructure/database/drizzle/client'
import { transfer_method_type } from '@infrastructure/database/drizzle/schemas'
import IRepository from '@src/core/shared/IRepository'
import { MTransferMethodType } from '@src/infrastructure/models/transfer_method_type.model'
import { eq } from 'drizzle-orm/sql'

export interface IRepoTransferMethodType extends IRepository<MTransferMethodType> {
  findByName(name: string): Promise<MTransferMethodType | undefined>;
}

export default class TransferMethodTypeDrizzleRepository implements IRepoTransferMethodType {
  public async create(data: StrictOmit<MTransferMethodType, "id">): Promise<MTransferMethodType | undefined> {
    const transfer_method_types = await db.insert(transfer_method_type).values(data).returning()
    return transfer_method_types[0]
  }

  public async findById(id: number): Promise<MTransferMethodType | undefined> {
    const tmt = await db.query.transfer_method_type.findFirst({
      where: eq(transfer_method_type.id, id)
    })
    if(!tmt) return undefined

    return tmt
  }

  public async findByName(name: string): Promise<MTransferMethodType | undefined> {
    const tmt = await db.query.transfer_method_type.findFirst({
      where: eq(transfer_method_type.name, name)
    })
    if(!tmt){
      return undefined
    }
    return tmt
  }

  public async findAll(): Promise<MTransferMethodType[]> {
    return db.query.transfer_method_type.findMany()
  }

  public async update(id: number, data: StrictOmit<MTransferMethodType, "id">): Promise<MTransferMethodType | undefined> {
    const results = await db.update(transfer_method_type).set(data).where(
      eq(transfer_method_type.id, id)
    ).returning()
    if(!results) return undefined;
    return results[0]
  }

  public async delete(id: number): Promise<boolean> {
    const results = await db.delete(transfer_method_type).where(
      eq(transfer_method_type.id, id)
    ).returning();
    if(!results) return false;
    return true;
  }
}