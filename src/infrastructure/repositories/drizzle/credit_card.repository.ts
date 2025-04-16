import { CreditCard } from "@core/entities/credit_card.entity";
import { DTO_CreditCard } from "@core/shared/DTOTypes";
import { Partial_DTO_CreditCard } from "@core/shared/PartialEntitiesTypes";
import { IRepoCreditCard } from "@core/shared/RepositoryTypes";
import { db } from "@src/infrastructure/database/drizzle/client";
import { credit_card } from "@src/infrastructure/database/drizzle/schemas";
import { eq } from "drizzle-orm/sql";

export default class CreditCardDrizzleRepository implements IRepoCreditCard {
    async create(data: DTO_CreditCard): Promise<CreditCard | undefined> {
        const {
            last_four_digits,
            closing_date,
            due_date,
            is_disabled,
            ...forInsert
        } = {
            ...data,
            lastFourDigits: data.last_four_digits,
            closingDate: data.closing_date.toISOString().split('T')[0],
            dueDate: data.due_date.toISOString().split('T')[0],
            isDisabled: data.is_disabled
        } 
        
        const results = await db.insert(credit_card).values(forInsert).returning()
        
        if(!results) return;
        
        return {
            ...data,
            id: results[0].id,
            created_at: new Date(results[0].createdAt),
            updated_at: new Date(results[0].updatedAt),
        }
    }
    async findById(id: number): Promise<CreditCard | undefined> {
        const result = await db.query.credit_card.findFirst({where: eq(credit_card.id, id)})
        
        if (!result) return;
        
        return {
            ...result,
            last_four_digits: result.lastFourDigits,
            closing_date: new Date(result.closingDate),
            due_date: new Date(result.dueDate),
            is_disabled: result.isDisabled,
            created_at: new Date(result.createdAt),
            updated_at: new Date(result.updatedAt)
        }
    }
    async findByNickname(nickname: string): Promise<CreditCard | undefined> {
        const result = await db.query.credit_card.findFirst({where: eq(credit_card.nickname, nickname)})
        
        if (!result) return;
        
        return {
            ...result,
            last_four_digits: result.lastFourDigits,
            closing_date: new Date(result.closingDate),
            due_date: new Date(result.dueDate),
            is_disabled: result.isDisabled,
            created_at: new Date(result.createdAt),
            updated_at: new Date(result.updatedAt)
        }
    }
    async findAll(): Promise<CreditCard[]> {
        const result = await db.query.credit_card.findMany()
        
        return result.map((creditCard) => {
            const creditCardTransformed: CreditCard = {
                ...creditCard,
                last_four_digits: creditCard.lastFourDigits,
                closing_date: new Date(creditCard.closingDate),
                due_date: new Date(creditCard.dueDate),
                is_disabled: creditCard.isDisabled,
                created_at: new Date(creditCard.createdAt),
                updated_at: new Date(creditCard.updatedAt)
            }
            return creditCardTransformed
        })
    }
    async update(data: Partial_DTO_CreditCard): Promise<CreditCard | undefined> {
        const {
            id: idForUpdate,
            last_four_digits,
            closing_date,
            due_date,
            is_disabled,
            ...forUpdate
        } = {
            ...data,
            lastFourDigits: data.last_four_digits,
            closingDate: data.closing_date?.toISOString().split('T')[0],
            dueDate: data.due_date?.toISOString().split('T')[0],
            isDisabled: data.is_disabled
        }

        const results = await db.update(credit_card).set(forUpdate).where(eq(credit_card.id, idForUpdate)).returning()

        if(!results) return;

        return this.findById(idForUpdate)
    }
    async delete(id: number): Promise<boolean> {
        const result = await db.delete(credit_card).where(eq(credit_card.id, id)).returning()
        if(!result) return false;
        return true
    }

}