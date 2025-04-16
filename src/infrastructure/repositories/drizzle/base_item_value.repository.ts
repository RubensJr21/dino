import { BaseItemValue } from '@core/entities/base_item_value.entity'
import { DTO_BaseItemValue } from '@core/shared/DTOTypes'
import { Partial_DTO_BaseItemValue } from '@core/shared/PartialEntitiesTypes'
import { IRepoBaseItemValue } from '@core/shared/RepositoryTypes'
import { db } from '@infrastructure/database/drizzle/client'
import { base_item_value, item_value } from '@infrastructure/database/drizzle/schemas'
import { eq } from 'drizzle-orm/sql'

export default class BaseItemValueDrizzleRepository implements IRepoBaseItemValue {
    public async create(data: DTO_BaseItemValue): Promise<BaseItemValue | undefined>{
        const {
            scheduled_at, // Datas são implementadas com string
            tag,
            transfer_method_type,
            was_processed,
            ...forInsert
        } = {
            ...data,
            scheduledAt: data.scheduled_at.toISOString().split('T')[0], // Datas são implementadas com string
            transferMethodTypeId: data.transfer_method_type.id,
            tagId: data.tag.id,
            wasProcessed: data.was_processed
        }
		const baseItemValues = await db.insert(base_item_value).values(forInsert).returning()

        if(!baseItemValues) return;
        
        const baseItemValue = baseItemValues[0]

        return {
            ...data,
            id: baseItemValue.id,
            scheduled_at: new Date(baseItemValue.scheduledAt), // Datas são implementadas com string
            created_at: new Date(baseItemValue.createdAt), // Datas são implementadas com string
            updated_at: new Date(baseItemValue.updatedAt), // Datas são implementadas com string
        }
    }

    public async findById(id: number){
		const result = await db.query.base_item_value.findFirst({
			where: eq(base_item_value.id, id),
            with: {
                tag: true,
                transferMethodType: true
            }
        })
		if(!result) return undefined;

		const base_item_value_transformed: BaseItemValue = {
            ...result,
			scheduled_at: new Date(result.scheduledAt),
			was_processed: result.wasProcessed,
			transfer_method_type: result.transferMethodType,
			tag: result.tag,
			created_at: new Date(result.createdAt),
			updated_at: new Date(result.updatedAt)
		}

        return base_item_value_transformed
    }

    public async findAll(){
        const result = await db.query.base_item_value.findMany({
            with: {
                tag: true,
                transferMethodType: true
            }
        })
        return result.map((biv) => {
            const biv_transformed: BaseItemValue = {
                ...biv,
                scheduled_at: new Date(biv.scheduledAt),
                was_processed: biv.wasProcessed,
                transfer_method_type: biv.transferMethodType,
                tag: biv.tag,
                created_at: new Date(biv.createdAt),
                updated_at: new Date(biv.updatedAt)
            }
            return biv_transformed
        })
    }

    public async update(data: Partial_DTO_BaseItemValue): Promise<BaseItemValue | undefined>{
        const {
            id: idForUpdate,
            scheduled_at,
            was_processed,
            tag,
            transfer_method_type,
            ...forUpdate
        } = {
            ...data,
            scheduledAt: data.scheduled_at?.toISOString().split('T')[0],
            transferMethodTypeId: data.transfer_method_type?.id,
            tagId: data.tag?.id
        }
        const results = await db.update(base_item_value).set(forUpdate).where(eq(base_item_value.id, idForUpdate)).returning()

        if (!results) return;

        return this.findById(idForUpdate)
    }

    public async delete(id: number): Promise<boolean>{
        const results = await db.delete(item_value).where(eq(item_value.id, id)).returning();
        if(!results) return false;
        return true;
    }
}