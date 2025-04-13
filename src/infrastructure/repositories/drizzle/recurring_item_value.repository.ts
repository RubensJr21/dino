import { BaseItemValue } from '@core/entities/base_item_value.entity'
import { RecurringItemValue } from '@core/entities/recurring_item_value.entity'
import { DTO_RecurringItemValue } from '@core/shared/DTOTypes'
import { Partial_DTO_RecurringItemValue } from '@core/shared/PartialEntitiesTypes'
import { IRepoRecurringItemValue } from '@core/shared/RepositoryTypes'
import { db } from '@infrastructure/database/drizzle/client'
import { recurring_item_value } from '@infrastructure/database/drizzle/schemas'
import { eq } from 'drizzle-orm/sql'

export default class ItemValueDrizzleRepository implements IRepoRecurringItemValue {
    public async create(data: DTO_RecurringItemValue): Promise<RecurringItemValue | undefined> {
        const {
            base_item_value,
            is_disabled,
            recurrence_type,
            ...forInsert
        } = {
            ...data,
            baseItemValueId: data.base_item_value.id,
            isDisabled: data.is_disabled,
            recurrenceTypeId: data.recurrence_type.id
        }
        const itemValues = await db.insert(recurring_item_value).values(forInsert).returning()
        const iiv_instanced: RecurringItemValue = {
            ...data,
            id: itemValues[0].id
        }
        return iiv_instanced
    }

    public async findById(id: number): Promise<RecurringItemValue | undefined> {
        const result = await db.query.recurring_item_value.findFirst({
            where: eq(recurring_item_value.id, id),
            with: {
                baseItemValue: {
                    with: {
                        tag: true,
                        transferMethodType: true
                    }
                },
                recurrenceType: true
            }
        })
        if(!result) return undefined;

        const {id: recurring_item_value_id, baseItemValue, isDisabled, recurrenceType} = result

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

        const riv_instanced: RecurringItemValue = {
            ...result,
            id: recurring_item_value_id,
            base_item_value: base_item_value_instanced,
            is_disabled: isDisabled,
            recurrence_type: recurrenceType
        } 

        return riv_instanced
    }

    public async findAll(): Promise<RecurringItemValue[]>{
        const result = await db.query.recurring_item_value.findMany({
            with: {
                baseItemValue: {
                    with: {
                        tag: true,
                        transferMethodType: true
                    }
                },
                recurrenceType: true
            }
        })
        return result.map((riv) => {
            const riv_transformed: RecurringItemValue = {
                ...riv,
                base_item_value: {
                    ...riv.baseItemValue,
                    scheduled_at: new Date(riv.baseItemValue.scheduledAt),
                    was_processed: riv.baseItemValue.wasProcessed,
                    transfer_method_type: riv.baseItemValue.transferMethodType,
                    tag: riv.baseItemValue.tag,
                    created_at: new Date(riv.baseItemValue.createdAt),
                    updated_at: new Date(riv.baseItemValue.updatedAt)
                },
                is_disabled: riv.isDisabled,
                recurrence_type: riv.recurrenceType
            }
            return riv_transformed
        }) 
    }

    public async update(data: Partial_DTO_RecurringItemValue): Promise<RecurringItemValue | undefined> {
        const {
            id: idForUpdate,
            ...forUpdate
        } = {
            ...data,
            baseItemValueId: data.base_item_value?.id
        }
        const results = await db.update(recurring_item_value).set(forUpdate).where(eq(recurring_item_value.id, idForUpdate))

        if(!results) return undefined;

        return this.findById(idForUpdate)
    }

    public async delete(id: number){
        await db.delete(recurring_item_value).where(eq(recurring_item_value.id, id))
        return true
    }
}