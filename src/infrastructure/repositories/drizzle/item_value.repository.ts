import { BaseItemValue } from '@core/entities/base_item_value.entity'
import { ItemValue } from '@core/entities/item_value.entity'
import { DTO_ItemValue } from '@core/shared/DTOTypes'
import { Partial_DTO_ItemValue } from '@core/shared/PartialEntitiesTypes'
import { IRepoItemValue } from '@core/shared/RepositoryTypes'
import { db } from '@infrastructure/database/drizzle/client'
import { item_value } from '@infrastructure/database/drizzle/schemas'
import { eq } from 'drizzle-orm/sql'

export default class ItemValueDrizzleRepository implements IRepoItemValue {
    public async create(data: DTO_ItemValue): Promise<ItemValue | undefined> {
		const forInsert = {
			baseItemValueId: data.base_item_value.id
		}
		const itemValues = await db.insert(item_value).values(forInsert).returning()
        const item_value_instanced: ItemValue = {
            ...data,
            id: itemValues[0].id
        }
        return item_value_instanced
    }

    public async findById(id: number): Promise<ItemValue | undefined> {
		const result = await db.query.item_value.findFirst({
			where: eq(item_value.id, id),
			with: {
                baseItemValue: {
                    with: {
                        tag: true,
                        transferMethodType: true
                    }
                }
            }
        })
		if(!result) return undefined;

		const {id: item_value_id, baseItemValue} = result

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
			updated_at: new Date(baseItemValue.updatedAt)
		}

		const item_value_instanced: ItemValue = {
			id: item_value_id,
			base_item_value: base_item_value_instanced
		} 

        return item_value_instanced
    }

    public async findAll(): Promise<ItemValue[]>{
        const result = await db.query.item_value.findMany({
            with: {
                baseItemValue: {
                    with: {
                        tag: true,
                        transferMethodType: true
                    }
                }
            }
        })
        return result.map((iv) => {
            const iv_transformed: ItemValue = {
                ...iv,
                base_item_value: {
                    ...iv.baseItemValue,
                    scheduled_at: new Date(iv.baseItemValue.scheduledAt),
                    was_processed: iv.baseItemValue.wasProcessed,
                    transfer_method_type: iv.baseItemValue.transferMethodType,
                    tag: iv.baseItemValue.tag,
                    created_at: new Date(iv.baseItemValue.createdAt),
                    updated_at: new Date(iv.baseItemValue.updatedAt)
                }
            }
            return iv_transformed
        }) 
    }

    public async update(data: Partial_DTO_ItemValue): Promise<ItemValue | undefined> {
        const {
            id: idForUpdate,
            ...forUpdate
        } = {
            ...data,
            baseItemValueId: data.base_item_value?.id
        }
        const results = await db.update(item_value).set(forUpdate).where(eq(item_value.id, idForUpdate))

        if(!results) return undefined;

        return this.findById(idForUpdate)
    }

    public async delete(id: number): Promise<boolean>{
        await db.delete(item_value).where(eq(item_value.id, id))
        return true
    }
}