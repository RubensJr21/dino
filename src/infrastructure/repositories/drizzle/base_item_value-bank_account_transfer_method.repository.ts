import { BankAccount } from "@core/entities/bank_account.entity";
import { BankAccountTransferMethod } from "@core/entities/bank_account_transfer_method.entity";
import { BaseItemValue_BankAccountTransferMethod } from "@core/entities/base_item_value-bank_account_transfer_method.entity";
import { BaseItemValue } from "@core/entities/base_item_value.entity";
import { IRepoBaseItemValue_BankAccountTransferMethod } from "@core/shared/RepositoryTypes";
import { db } from "@src/infrastructure/database/drizzle/client";
import { base_item_value_pivot_bank_account_transfer_method } from "@src/infrastructure/database/drizzle/schemas";
import { eq } from "drizzle-orm/sql";

export default class BaseItemValue_BankAccountTransferMethodDrizzleRepository implements IRepoBaseItemValue_BankAccountTransferMethod {
    async create(data: BaseItemValue_BankAccountTransferMethod): Promise<BaseItemValue_BankAccountTransferMethod | undefined> {
        const forInsert = {
            baseItemValueId: data.base_item_value.id,
            bankAccountTransferMethodId: data.bank_account_transfer_method.id
        }
        
        const results = await db.insert(base_item_value_pivot_bank_account_transfer_method).values(forInsert).returning()
        
        if(!results) return undefined;
        
        return {
            ...data,
            id: results[0].id
        }
    }
    async findById(id: number): Promise<BaseItemValue_BankAccountTransferMethod | undefined> {
        const result = await db.query.base_item_value_pivot_bank_account_transfer_method.findFirst({
            where(fields, operators) {
                return operators.eq(
                    fields.id,
                    id
                )},
                with: {
                    base_item_value: {
                        with: {
                            tag: true,
                            transferMethodType: true
                        }
                    },
                    bankAccountTransferMethod: {
                        with: {
                            bankAccount: true
                        }
                    }
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
        
        const bank_account: BankAccount = {
            ...result.bankAccountTransferMethod.bankAccount,
            is_disabled: result.bankAccountTransferMethod.bankAccount.isDisabled,
            created_at: new Date(result.bankAccountTransferMethod.bankAccount.createdAt),
            updated_at: new Date(result.bankAccountTransferMethod.bankAccount.updatedAt)
        }
        
        const bank_account_transfer_method: BankAccountTransferMethod = {
            ...result.bankAccountTransferMethod,
            bank_account: bank_account,
            created_at: new Date(result.base_item_value.createdAt),
            updated_at: new Date(result.base_item_value.updatedAt),
        }
        
        return {
            id,
            base_item_value,
            bank_account_transfer_method
        }
    }
    findByBaseItemValueAndBankTransferMethod(base_item: BaseItemValue, ba_transfer_method: BankAccountTransferMethod): Promise<BaseItemValue_BankAccountTransferMethod | undefined> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<BaseItemValue_BankAccountTransferMethod[]> {
        const results = await db.query.base_item_value_pivot_bank_account_transfer_method.findMany({
            with: {
                base_item_value: {
                    with: {
                        tag: true,
                        transferMethodType: true
                    }
                },
                bankAccountTransferMethod: {
                    with: {
                        bankAccount: true
                    }
                }
            }
        })
        return results.map((biv_batm) => {
            const base_item_value: BaseItemValue = {
                ...biv_batm.base_item_value,
                scheduled_at: new Date(biv_batm.base_item_value.scheduledAt),
                was_processed: biv_batm.base_item_value.wasProcessed,
                transfer_method_type: biv_batm.base_item_value.transferMethodType,
                tag: biv_batm.base_item_value.tag,
                created_at: new Date(biv_batm.base_item_value.createdAt),
                updated_at: new Date(biv_batm.base_item_value.updatedAt)
            }
    
            const bank_account: BankAccount = {
                ...biv_batm.bankAccountTransferMethod.bankAccount,
                is_disabled: biv_batm.bankAccountTransferMethod.bankAccount.isDisabled,
                created_at: new Date(biv_batm.bankAccountTransferMethod.bankAccount.createdAt),
                updated_at: new Date(biv_batm.bankAccountTransferMethod.bankAccount.updatedAt)
            }
    
            const bank_account_transfer_method: BankAccountTransferMethod = {
                ...biv_batm.bankAccountTransferMethod,
                bank_account: bank_account,
                created_at: new Date(biv_batm.base_item_value.createdAt),
                updated_at: new Date(biv_batm.base_item_value.updatedAt),
            }
    
            return {
                ...biv_batm,
                base_item_value,
                bank_account_transfer_method
            }
        })
    }
    async update(data: BaseItemValue_BankAccountTransferMethod): Promise<BaseItemValue_BankAccountTransferMethod | undefined> {
        const {
            id: idForUpdate,
            ...forUpdate
        } = {
            ...data,
            baseItemValueId: data.base_item_value.id,
            bankAccountTransferMethodId: data.bank_account_transfer_method.id
        }

        const results = await db.update(base_item_value_pivot_bank_account_transfer_method).set(forUpdate).where(
            eq(
                base_item_value_pivot_bank_account_transfer_method.id,
                idForUpdate
            )
        ).returning()

        if(!results) return undefined;

        return this.findById(idForUpdate)
    }
    async delete(id: number): Promise<boolean> {
        const result = await db.delete(base_item_value_pivot_bank_account_transfer_method).where(
            eq(
                base_item_value_pivot_bank_account_transfer_method.id,
                id
            )
        ).returning()
        if(!result) return false;            
        return true;
    }

}