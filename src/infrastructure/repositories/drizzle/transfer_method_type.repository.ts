import { TransferMethodType } from '@core/entities/transfer_method_type.entity'
import { DTO_TransferMethodType } from '@core/shared/DTOTypes'
import { Partial_DTO_TransferMethodType } from '@core/shared/PartialEntitiesTypes'
import { IRepoTransferMethodType } from '@core/shared/RepositoryTypes'
import { db } from '@infrastructure/database/drizzle/client'
import { transfer_method_type } from '@infrastructure/database/drizzle/schemas'
import { eq } from 'drizzle-orm/sql'

export default class TransferMethodTypeDrizzleRepository implements IRepoTransferMethodType {
    public async create(data: DTO_TransferMethodType): Promise<TransferMethodType | undefined> {
        const transfer_method_types = await db.insert(transfer_method_type).values(data).returning()
        return transfer_method_types[0]
    }
    public async findById(id: number): Promise<TransferMethodType | undefined> {
        return db.query.transfer_method_type.findFirst({
            where: eq(transfer_method_type.id, id)
        })
    }
    findByName(name: string): Promise<TransferMethodType | undefined> {
        return db.query.transfer_method_type.findFirst({
            where: eq(transfer_method_type.name, name)
        })
    }
    public async findAll(): Promise<TransferMethodType[]> {
        return db.query.transfer_method_type.findMany()
    }
    public async update(data: Partial_DTO_TransferMethodType): Promise<TransferMethodType | undefined> {
        const {
            id: idForUpdate,
            ...forUpdate
        } = data
        const results = await db.update(transfer_method_type).set(forUpdate).where(eq(transfer_method_type.id, idForUpdate))
        if(!results) return;
        return this.findById(idForUpdate)
    }
    public async delete(id: number): Promise<boolean> {
        const results = await db.delete(transfer_method_type).where(eq(transfer_method_type.id, id)).returning();
        if(!results) return false;
        return true;
    }

}