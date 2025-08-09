import { ItemValue } from '@src/core/entities/item_value.entity'
import { MInstallment } from '@src/core/models/installment.model'
import { MItemValue } from '@src/core/models/item_value.model'
import { build_internal_repo_error_installment, CreateInstallmentParams, IRepoInstallment, UpdateInstallmentParams } from '@src/core/shared/interfaces/IRepoInstallment'
import { installment_mapper } from '@src/core/shared/mappers/installment'
import { item_value_mapper } from '@src/core/shared/mappers/item_value'
import { RepoInterfaceNames } from '@src/core/shared/types/RepoInterfaceNames'
import { installment } from '@src/infrastructure/database/schemas/installment.schema'
import { installment_item_value } from '@src/infrastructure/database/schemas/installment_item_value.schema'
import { item_value } from '@src/infrastructure/database/schemas/item_value.schema'
import { and, eq } from 'drizzle-orm/sql'
import { db } from '../database/client'
import { tag, transfer_method } from '../database/schemas'

export default class InstallmentDrizzleRepository implements IRepoInstallment {
  constructor() { }

  public create(data: CreateInstallmentParams): ReturnType<IRepoInstallment["create"]> {
    try {
      const result = db.insert(installment).values({
        description: data.description,
        fk_id_transfer_method: data.transfer_method.id,
        fk_id_tag: data.tag.id,
        start_date: data.start_date,
        installments_number: data.installments_number,
        total_amount: data.total_amount,
      }).returning({ id: installment.id }).get()

      const installment_created = db.query.installment.findFirst({
        with: {
          tag: true,
          transfer_method: true
        },
        where: eq(installment.id, result.id)
      }).sync()

      if (!installment_created) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Installment,
            method: "create",
            code: "id_not_found",
            message: "O item pode não ter sido cadastrado ainda."
          }
        }
      }

      return {
        success: true,
        data: installment_mapper(installment_created)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "create",
          error as Error
        )
      }
    }
  }

  public register_installments(id: MInstallment["id"], item_value_id_list: Array<ItemValue["id"]>): ReturnType<IRepoInstallment["register_installments"]> {
    try {
      for (const item_value_id of item_value_id_list) {
        const result = db.insert(installment_item_value).values({
          fk_id_installment: id,
          fk_id_item_value: item_value_id,
        }).returning({ id: installment_item_value.id }).get()
  
        const installment_item_value_created = db.query.installment_item_value.findFirst({
          where: eq(installment.id, result.id)
        }).sync()
  
        if (!installment_item_value_created) {
          return {
            success: false,
            error: {
              scope: RepoInterfaceNames.Installment,
              method: "register_installments",
              code: "id_not_found",
              message: "O item pode não ter sido cadastrado ainda."
            }
          }
        }
      }
  
      return {
        success: true,
        data: true
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "register_installments",
          error as Error
        )
      }
    }
  }

  public find_by_id(id: MInstallment["id"]): ReturnType<IRepoInstallment["find_by_id"]> {
    try {
      const installment_result = db.query.installment.findFirst({
        where: eq(installment.id, id),
        with: {
          transfer_method: true,
          tag: true
        }
      }).sync()
  
      if (!installment_result) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Installment,
            method: "find_by_id",
            code: "id_not_found",
            message: `Foi retornado o valor ${installment_result} na busca.`
          }
        }
      }
  
      const installment_founded = installment_mapper(installment_result)
  
      return {
        success: true,
        data: installment_founded
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "find_by_id",
          error as Error
        )
      }
    }
  }

  public find_item_value(installment_id: MInstallment["id"], item_value_id: MItemValue["id"]): ReturnType<IRepoInstallment["find_item_value"]> {
    try {
      const result = db.query.installment_item_value.findFirst({
        with: {
          item_value: {
            with: {
              tag: true,
              transfer_method: true
            }
          }
        },
        where: and(
          eq(installment_item_value.fk_id_installment, installment_id),
          eq(installment_item_value.fk_id_item_value, item_value_id),
        )
      }).sync()
  
      if (!result) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Installment,
            method: "find_item_value",
            code: "id_not_found",
            message: `Foi retornado o valor ${result} na busca.`
          }
        }
      }
  
      return {
        success: true,
        data: item_value_mapper(result.item_value)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "find_item_value",
          error as Error
        )
      }
    }
  }

  public find_all(): ReturnType<IRepoInstallment["find_all"]> {
    try {
      const result = db.query.installment.findMany({
        with: {
          transfer_method: true,
          tag: true
        }
      }).sync()
  
      const installments = result.map(installment_mapper)
  
      return {
        success: true,
        data: installments
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "find_all",
          error as Error
        )
      }
    }
  }

  public find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): ReturnType<IRepoInstallment["find_all_by_cashflow_type"]> {
    try {
      const result = db.select({
        id: installment.id,
        description: installment.description,
        start_date: installment.start_date,
        installments_number: installment.installments_number,
        total_amount: installment.total_amount,
        created_at: installment.created_at,
        updated_at: installment.updated_at,
        transfer_method: {
          id: transfer_method.id,
          method: transfer_method.method
        },
        tag: {
          id: tag.id,
          description: tag.description,
        }
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
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "find_all_by_cashflow_type",
          error as Error
        )
      }
    }
  }

  public find_all_item_value(id: MInstallment["id"]): ReturnType<IRepoInstallment["find_all_item_value"]> {
    try {
      const result = db.query.installment_item_value.findMany({
        with: {
          item_value: {
            with: {
              tag: true,
              transfer_method: true
            }
          }
        },
        where: and(
          eq(installment_item_value.fk_id_installment, id),
        )
      }).sync()
  
      return {
        success: true,
        data: result.map(installment => item_value_mapper(installment.item_value))
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "find_all_item_value",
          error as Error
        )
      }
    }
  }

  public update(id: MInstallment["id"], data: UpdateInstallmentParams): ReturnType<IRepoInstallment["update"]> {
    try {
      const result = db.update(installment).set(data)
        .where(eq(installment_item_value.id, id))
        .returning({ id: installment_item_value.id })
        .get()
  
      const installment_updated = db.query.installment.findFirst({
        with: {
          transfer_method: true,
          tag: true
        },
        where: eq(installment.id, result.id)
      }).sync()
  
      if (!installment_updated) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Installment,
            method: "update",
            code: "id_not_found",
            message: "Um erro aconteceu ao obter o parcelamento atualizado."
          }
        }
      }
  
      return {
        success: true,
        data: installment_mapper(installment_updated)
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "update",
          error as Error
        )
      }
    }
  }

  public delete(id: MInstallment["id"]): ReturnType<IRepoInstallment["delete"]> {
    try {
      // Usando o onDelete com modo cascade basta apagar o pai e todos os outros serão apagados
      const installment_deleted = db.delete(installment).where(eq(installment.id, id)).returning().get()
  
      if (!installment_deleted) {
        return {
          success: false,
          error: {
            scope: RepoInterfaceNames.Installment,
            method: "delete",
            code: "id_not_found",
            message: "Ocorreu um erro ao deletar o parcelamento."
          }
        }
      }
  
      return {
        success: true,
        data: true
      }
    } catch (error) {
      return {
        success: false,
        error: build_internal_repo_error_installment(
          "delete",
          error as Error
        )
      }
    }
  }
}