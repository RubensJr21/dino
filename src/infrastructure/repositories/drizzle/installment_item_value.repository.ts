import { BaseItemValue } from '@core/entities/base_item_value.entity'
import { InstallmentItemValue } from '@core/entities/installment_item_value.entity'
import { DTO_InstallmentItemValue } from '@core/shared/DTOTypes'
import { Partial_DTO_InstallmentItemValue } from '@core/shared/PartialEntitiesTypes'
import { IRepoInstallmentItemValue } from '@core/shared/RepositoryTypes'
import { db } from '@infrastructure/database/drizzle/client'
import { installment_item_value } from '@infrastructure/database/drizzle/schemas'
import { eq } from 'drizzle-orm/sql'

export default class ItemValueDrizzleRepository implements IRepoInstallmentItemValue {
    public async create(data: DTO_InstallmentItemValue): Promise<InstallmentItemValue | undefined> {
        const {
            base_item_value,
            installments_number,
            ...forInsert
        } = {
            ...data,
            baseItemValueId: data.base_item_value.id,
            installmentsNumber: data.installments_number
        }
        const itemValues = await db.insert(installment_item_value).values(forInsert).returning()
        const iiv_instanced: InstallmentItemValue = {
            ...data,
            id: itemValues[0].id,
        }
        return iiv_instanced
    }

    public async findById(id: number): Promise<InstallmentItemValue | undefined> {
        const result = await db.query.installment_item_value.findFirst({
            where: eq(installment_item_value.id, id),
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

        const {id: installment_item_value_id, baseItemValue, installmentsNumber} = result

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

        const iiv_instanced: InstallmentItemValue = {
            id: installment_item_value_id,
            base_item_value: base_item_value_instanced,
            installments_number: installmentsNumber
        } 

        return iiv_instanced
    }

    public async findAll(): Promise<InstallmentItemValue[]>{
        const result = await db.query.installment_item_value.findMany({
            with: {
                baseItemValue: {
                    with: {
                        tag: true,
                        transferMethodType: true
                    }
                }
            }
        })
        return result.map((iiv) => {
            const iiv_transformed: InstallmentItemValue = {
                ...iiv,
                base_item_value: {
                    ...iiv.baseItemValue,
                    scheduled_at: new Date(iiv.baseItemValue.scheduledAt),
                    was_processed: iiv.baseItemValue.wasProcessed,
                    transfer_method_type: iiv.baseItemValue.transferMethodType,
                    tag: iiv.baseItemValue.tag,
                    created_at: new Date(iiv.baseItemValue.createdAt),
                    updated_at: new Date(iiv.baseItemValue.updatedAt)
                },
                installments_number: iiv.installmentsNumber
            }
            return iiv_transformed
        }) 
    }

    public async update(data: Partial_DTO_InstallmentItemValue): Promise<InstallmentItemValue | undefined> {
        const {
            id: idForUpdate,
            ...forUpdate
        } = {
            ...data,
            baseItemValueId: data.base_item_value?.id
        }
        const results = await db.update(installment_item_value).set(forUpdate).where(eq(installment_item_value.id, idForUpdate))

        if(!results) return undefined;

        return this.findById(idForUpdate)
    }

    public async delete(id: number){
        await db.delete(installment_item_value).where(eq(installment_item_value.id, id))
        return true
    }
}