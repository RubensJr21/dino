import { BaseItemValue_CreditCard } from "@core/entities/base_item_value-credit_card.entity";
import { BaseItemValue } from "@core/entities/base_item_value.entity";
import { CreditCard } from "@core/entities/credit_card.entity";
import { DTO_BaseItemValue_CreditCard } from "@core/shared/DTOTypes";
import { Partial_DTO_BaseItemValue_CreditCard } from "@core/shared/PartialEntitiesTypes";
import { IRepoBaseItemValue_CreditCard } from "@core/shared/RepositoryTypes";
import { db } from "@src/infrastructure/database/drizzle/client";
import { base_item_value_pivot_credit_card } from "@src/infrastructure/database/drizzle/schemas";
import { eq } from "drizzle-orm/sql";

export default class BaseItemValue_CreditCardDrizzleRepository implements IRepoBaseItemValue_CreditCard {
    async create(data: DTO_BaseItemValue_CreditCard): Promise<BaseItemValue_CreditCard | undefined> {
        const forInsert = {
            baseItemValueId: data.base_item_value.id,
            creditCardId: data.credit_card.id
        }
        
        const results = await db.insert(base_item_value_pivot_credit_card).values(forInsert).returning()
        
        if(!results) return undefined;
        
        return data
    }
    async findById(id: number): Promise<BaseItemValue_CreditCard | undefined> {
        const result = await db.query.base_item_value_pivot_credit_card.findFirst({
            where(fields, operators) {
                return operators.eq(
                    fields.id,
                    id
                )
            },
            with: {
                base_item_value: {
                    with: {
                        tag: true,
                        transferMethodType: true
                    }
                },
                credit_card: true
            }
        })
        if(!result) return undefined;
        
        const base_item_value: BaseItemValue = {
            ...result.base_item_value,
            scheduled_at: new Date(result.base_item_value.scheduledAt),
            was_processed: result.base_item_value.wasProcessed,
            transfer_method_type: result.base_item_value.transferMethodType,
            tag: result.base_item_value.tag,
            created_at: new Date(result.base_item_value.createdAt),
            updated_at: new Date(result.base_item_value.updatedAt)
        }
        
        const credit_card: CreditCard = {
            ...result.credit_card,
            is_disabled: result.credit_card.isDisabled,
            created_at: new Date(result.credit_card.createdAt),
            updated_at: new Date(result.credit_card.updatedAt),
            last_four_digits: result.credit_card.lastFourDigits,
            closing_date: new Date(result.credit_card.closingDate),
            due_date: new Date(result.credit_card.dueDate)
        }
        
        return {
            id,
            base_item_value,
            credit_card
        }
    }
    async findByBaseItemValueAndBankTransferMethod(base_item: BaseItemValue, credit_card: CreditCard): Promise<BaseItemValue_CreditCard | undefined> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<BaseItemValue_CreditCard[]> {
        const results = await db.query.base_item_value_pivot_credit_card.findMany({
            with: {
                base_item_value: {
                    with: {
                        tag: true,
                        transferMethodType: true
                    }
                },
                credit_card: true
            }
        })
        return results.map((biv_cc) => {
            const base_item_value: BaseItemValue = {
                ...biv_cc.base_item_value,
                scheduled_at: new Date(biv_cc.base_item_value.scheduledAt),
                was_processed: biv_cc.base_item_value.wasProcessed,
                transfer_method_type: biv_cc.base_item_value.transferMethodType,
                tag: biv_cc.base_item_value.tag,
                created_at: new Date(biv_cc.base_item_value.createdAt),
                updated_at: new Date(biv_cc.base_item_value.updatedAt)
            }
    
            const credit_card: CreditCard = {
                ...biv_cc.credit_card,
                is_disabled: biv_cc.credit_card.isDisabled,
                created_at: new Date(biv_cc.credit_card.createdAt),
                updated_at: new Date(biv_cc.credit_card.updatedAt),
                last_four_digits: biv_cc.credit_card.lastFourDigits,
                closing_date: new Date(biv_cc.credit_card.closingDate),
                due_date: new Date(biv_cc.credit_card.dueDate)
            }
    
            return {
                ...biv_cc,
                base_item_value,
                credit_card
            }
        })
    }
    async update(data: Partial_DTO_BaseItemValue_CreditCard): Promise<BaseItemValue_CreditCard | undefined> {
        const {
            id: idForUpdate,
            ...forUpdate
        } = {
            ...data,
            baseItemValueId: data.base_item_value?.id,
            creditCardId: data.credit_card?.id
        }

        const results = await db.update(base_item_value_pivot_credit_card).set(forUpdate).where(eq(base_item_value_pivot_credit_card.id, idForUpdate)).returning()

        if(!results) return undefined;

        return this.findById(idForUpdate)
    }
    async delete(id: number): Promise<boolean> {
        const result = await db.delete(base_item_value_pivot_credit_card).where(
            eq(
                base_item_value_pivot_credit_card.id,
                id
            )
        ).returning()
        if(!result) return false;            
        return true;
    }
}