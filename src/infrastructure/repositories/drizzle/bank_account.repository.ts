import { BankAccount } from "@core/entities/bank_account.entity";
import { DTO_BankAccount } from "@core/shared/DTOTypes";
import { Partial_DTO_BankAccount } from "@core/shared/PartialEntitiesTypes";
import { IRepoBankAccount } from "@core/shared/RepositoryTypes";
import { db } from "@infrastructure/database/drizzle/client";
import { bank_account } from "@src/infrastructure/database/drizzle/schemas";
import { eq } from "drizzle-orm/sql";

export default class BankAccountDrizzleRepository implements IRepoBankAccount {
    async create(data: DTO_BankAccount): Promise<BankAccount | undefined> {
        const {
            is_disabled,
            ...forInsert
        } = {
            ...data,
            isDisabled: data.is_disabled
        }
        
        const results = await db.insert(bank_account).values(forInsert).returning()
        
        if(!results) return;
        
        return {
            ...data,
            id: results[0].id,
            is_disabled: results[0].isDisabled,
            created_at: new Date(results[0].createdAt),
            updated_at: new Date(results[0].updatedAt)
        }
    }
    async findById(id: number): Promise<BankAccount | undefined> {
        const result = await db.query.bank_account.findFirst({where: eq(bank_account.id, id)})
        if(!result) return;
        return {
            ...result,
            is_disabled: result.isDisabled,
            created_at: new Date(result.createdAt),
            updated_at: new Date(result.updatedAt)
        }
    }
    findByNickname(nickname: string): Promise<BankAccount | undefined> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<BankAccount[]> {
        const results = await db.query.bank_account.findMany()
        return results.map((bankAccount) => {
            const bankAccountTransformed: BankAccount = {
                ...bankAccount,
                is_disabled: bankAccount.isDisabled,
                created_at: new Date(bankAccount.createdAt),
                updated_at: new Date(bankAccount.updatedAt)
            }
            return bankAccountTransformed
        })
    }
    async update(data: Partial_DTO_BankAccount): Promise<BankAccount | undefined> {
        const {
            id: idForUpdate,
            is_disabled,
            ...forUpdate
        } = {
            ...data,
            isDisabled: data.is_disabled
        }

        const results = await db.update(bank_account).set(forUpdate).where(eq(bank_account.id, idForUpdate)).returning()

        if(!results) return;

        return this.findById(idForUpdate)

    }
    async delete(id: number): Promise<boolean> {
        const results = await db.delete(bank_account).where(eq(bank_account.id, id)).returning()
        if(!results) return false;
        return true
    }
    
}