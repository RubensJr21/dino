import { BankAccount } from "@core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@core/entities/bank_account_transfer_method.entity";
import { DTO_BankAccountTransferMethod } from "@core/shared/DTOTypes";
import { Partial_DTO_BankAccountTransferMethod } from "@core/shared/PartialEntitiesTypes";
import { IRepoBankAccountTransferMethod } from "@core/shared/RepositoryTypes";
import { db } from "@src/infrastructure/database/drizzle/client";
import { bank_account_transfer_method } from "@src/infrastructure/database/drizzle/schemas";
import { eq } from "drizzle-orm/sql";

export default class BankAccountTransferMethodDrizzleRepository implements IRepoBankAccountTransferMethod {
    public async create(data: DTO_BankAccountTransferMethod): Promise<BankAccountTransferMethod | undefined> {
        const {
            ...forInsert
        } = {
            ...data,
            bankAccountId: data.bank_account.id
        }
        
        const results = await db.insert(bank_account_transfer_method).values(forInsert).returning()

        if(!results) return undefined;
        
        return {
            ...data,
            id: results[0].id,
            created_at: new Date(results[0].createdAt),
            updated_at: new Date(results[0].updatedAt),
        }
    }
    public async findById(id: number): Promise<BankAccountTransferMethod | undefined> {
        const result = await db.query.bank_account_transfer_method.findFirst({
            where: eq(bank_account_transfer_method.id, id),
            with: {
                bankAccount: true
            }
        })
        
        if(!result) return;
        
        const bank_account: BankAccount = {
            ...result.bankAccount,
            is_disabled: result.bankAccount.isDisabled,
            created_at: new Date(result.bankAccount.createdAt),
            updated_at: new Date(result.bankAccount.updatedAt)
        }
        
        return {
            ...result,
            id: result.id,
            bank_account,
            created_at: new Date(result.createdAt),
            updated_at: new Date(result.updatedAt),
        }
    }
    findByBankAccountAndType(bank_account: BankAccount, type: string): Promise<BankAccountTransferMethod | undefined> {
        throw new Error("Method not implemented.");
    }
    public async findAll(): Promise<BankAccountTransferMethod[]> {
        const results = await db.query.bank_account_transfer_method.findMany({
            with: {
                bankAccount: true
            }
        })
        return results.map((bankAccountTransferMethod) => {
            const bank_account: BankAccount = {
                ...bankAccountTransferMethod.bankAccount,
                is_disabled: bankAccountTransferMethod.bankAccount.isDisabled,
                created_at: new Date(bankAccountTransferMethod.bankAccount.createdAt),
                updated_at: new Date(bankAccountTransferMethod.bankAccount.updatedAt)
            }
    
            return {
                ...bankAccountTransferMethod,
                id: bankAccountTransferMethod.id,
                bank_account,
                created_at: new Date(bankAccountTransferMethod.createdAt),
                updated_at: new Date(bankAccountTransferMethod.updatedAt),
            }
        })
    }
    public async update(data: Partial_DTO_BankAccountTransferMethod): Promise<BankAccountTransferMethod | undefined> {
        const {
            id: idForUpdate,
            bank_account,
            ...forUpdate
        } = {
            ...data,
            bankAccountId: data.bank_account?.id
        }
        
        const results = await db.update(bank_account_transfer_method).set(forUpdate).where(eq(bank_account_transfer_method.id, idForUpdate)).returning()

        if(!results) return undefined;

        return this.findById(idForUpdate)
    }
    public async delete(id: number): Promise<boolean> {
        const result = await db.delete(bank_account_transfer_method).where(eq(bank_account_transfer_method.id, id)).returning()
        if(!result) return false;
        return true;
    }
}