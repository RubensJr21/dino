import { ItemValue } from '@src/core/entities/item_value.entity'
import { MInstallment } from '@src/core/models/installment.model'
import { MItemValue } from '@src/core/models/item_value.model'
import { CreateInstallmentParams, IRepoInstallment, UpdateInstallmentParams } from '@src/core/shared/interfaces/IRepoInstallment'
import { installment_mapper } from '@src/core/shared/mappers/installment'
import { installment } from '@src/infrastructure/database/schemas/installment.schema'
import { installment_item_value } from '@src/infrastructure/database/schemas/installment_item_value.schema'
import { item_value } from '@src/infrastructure/database/schemas/item_value.schema'
import { eq } from 'drizzle-orm/sql'
import { Transaction } from '../database/TransactionType'

export default class InstallmentDrizzleRepository implements IRepoInstallment {
  constructor(private tx: Transaction) { }
  
  public create({
    start_date,
      installments_number,
      total_amount
  }: CreateInstallmentParams): ReturnType<IRepoInstallment["create"]> {
    // Registra Installment
    const result = this.tx.insert(installment).values({
      start_date,
      installments_number,
      total_amount,
    }).returning({ id: installment.id }).get()

    const installment_created = this.tx.query.installment.findFirst({ with: { recurrence_type: true }, where: eq(installment.id, result.id) }).sync()

    if(!installment_created) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "installment",
          message: "O item pode não ter sido cadastrado ainda."
        }
      }
    }
    
    return {
      success: true,
      data: installment_mapper(installment_created)
    }
  }

  public findById(id: MInstallment["id"]): ReturnType<IRepoInstallment["findById"]> {
    const installment_result = this.tx.query.installment.findFirst({
      where: eq(installment.id, id),
      with: {
        recurrence_type: true
      }
    }).sync()

    if (!installment_result) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "installment",
          message: `Foi retornado o valor ${installment_result} na busca.`
        }
      }
    }

    const installment_founded = installment_mapper(installment_result)

    return {
      success: true,
      data: installment_founded
    }
  }

  public findItemValue(installment_id: MInstallment["id"], item_value_id: MItemValue["id"]): ReturnType<IRepoInstallment["findItemValue"]> {
    // TODO: Implementar busca
    return {
      success: true,
      data: {} as ItemValue
    }
  }

  public findAll(): ReturnType<IRepoInstallment["findAll"]> {
    const result = this.tx.query.installment.findMany({
      with: {
        recurrence_type: true
      }
    }).sync()

    const installments = result.map(installment_mapper)

    return {
      success: true,
      data: installments
    }
  }

  public findAllByCashflowType(cashflow_type: ItemValue["cashflow_type"]): ReturnType<IRepoInstallment["findAllByCashflowType"]> {
    const result = this.tx.select({
        id: installment.id,
        start_date: installment.start_date,
        installments_number: installment.installments_number,
        total_amount: installment.total_amount,
        created_at: installment.created_at,
        updated_at: installment.updated_at,
      })
      .from(installment_item_value)
      .innerJoin(installment, eq(installment.id, installment_item_value.fk_id_installment))
      .innerJoin(item_value, eq(item_value.id, installment_item_value.fk_id_item_value))
      .where(eq(item_value.cashflow_type, cashflow_type))
      .all()    
    
    const installments = result.map(installment_mapper)

    return {
      success: true,
      data: installments
    }
  }

  public update(id: MInstallment["id"], data: UpdateInstallmentParams): ReturnType<IRepoInstallment["update"]> {
    const result = this.tx.update(installment).set(data)
    .where(eq(installment_item_value.id, id))
    .returning({ id: installment_item_value.id })
    .get()

    const installment_updated = this.tx.query.installment.findFirst({ with: { recurrence_type: true }, where: eq(installment.id, result.id) }).sync()
    
     if(!installment_updated) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "instalment",
          message: "Um erro aconteceu ao obter o parcelamento atualizado."
        }
      }
    }

    return {
      success: true,
      data: installment_mapper(installment_updated)
    }
  }

  public delete(id: MInstallment["id"]): ReturnType<IRepoInstallment["delete"]> {
    const installment_deleted = this.tx.delete(installment).where(eq(installment.id, id)).returning().get()

    if (!installment_deleted) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "installment",
          message: "Ocorreu um erro ao deletar o parcelamento."
        }
      }
    }

    return {
      success: true,
      data: true
    }
  }
}