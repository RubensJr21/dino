import { Installment } from '@src/core/entities/installment.entity'
import { ItemValue } from '@src/core/entities/item_value.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethod } from '@src/core/entities/transfer_method.entity'
import { MInstallment } from '@src/core/models/installment.model'
import { InstallmentNotFoundById } from '@src/core/shared/errors/installment'
import { IRepoInstallment, IRepoInstallmentCreateProps, IRepoInstallmentUpdateProps } from '@src/core/shared/interfaces/IRepositoryInstallment'
import { db } from '@src/infrastructure/database/client'
import { installment } from '@src/infrastructure/database/schemas/installment.schema'
import { installment_item_value } from '@src/infrastructure/database/schemas/installment_item_value.schema'
import { item_value } from '@src/infrastructure/database/schemas/item_value.schema'
import { eq } from 'drizzle-orm/sql'

export default class InstallmentDrizzleRepository implements IRepoInstallment {
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create({
      start_date,
      installments_number,
      total_amount,
      itens
    }: IRepoInstallmentCreateProps): Installment {

    const installment_result = db.insert(installment).values({
      start_date,
      installments_number,
      total_amount,
    }).returning({ id: installment.id }).get()

    itens.forEach(_item_value => {
      const item_value_result = db.insert(item_value).values({
        description: _item_value.description,
        cashflow_type: _item_value.cashflow_type,
        scheduled_at: _item_value.scheduled_at,
        amount: _item_value.amount,
        was_processed: _item_value.was_processed,
        fk_id_transfer_method: _item_value.transfer_method.id,
        fk_id_tag: _item_value.tag.id
      }).returning({ id: item_value.id }).get()

      db.insert(installment_item_value).values({
        fk_id_item_value: item_value_result.id,
        fk_id_installment: installment_result.id
      }).get()
    })

    return this.findById(installment_result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MInstallment["id"]): Installment {
    const installment_result = db.query.installment.findFirst({ where: eq(installment.id, id) }).sync()

    if(!installment_result) {
      throw new InstallmentNotFoundById(id);
    }
    
    const installment_item_value_result = db.query.installment_item_value.findMany({
      where: eq(installment_item_value.id, id),
      with: {
        item_value: {
          with: {
            tag: true,
            transfer_method: true,
          }
        }
      }
    }).sync()
    if(!installment_item_value_result) throw new InstallmentNotFoundById(id);

    const itens = installment_item_value_result.map(_installment => {
      return new ItemValue({
        id: _installment.item_value.id,
        description: _installment.item_value.description,
        cashflow_type: _installment.item_value.cashflow_type,
        scheduled_at: _installment.item_value.scheduled_at,
        amount: _installment.item_value.amount,
        was_processed: _installment.item_value.was_processed,
        transfer_method: new TransferMethod(_installment.item_value.transfer_method),
        tag: new Tag(_installment.item_value.tag),
        created_at: _installment.item_value.created_at,
        updated_at: _installment.item_value.updated_at,
      })
    })

    return new Installment({
      id,
      start_date: installment_result.start_date,
      installments_number: installment_result.installments_number,
      total_amount: installment_result.total_amount,
      itens,
      created_at: new Date(installment_result.created_at),
      updated_at: new Date(installment_result.updated_at),
    })
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): Installment[]{
    const result = db.query.installment_item_value.findMany({
      columns: { fk_id_installment: true }
    }).sync()
    return result.map((riv) => this.findById(riv.fk_id_installment)) 
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAllByCashflowType(cashflow_type: ItemValue["cashflow_type"]): Installment[]{
    const result = db.select({
      id: installment_item_value.id,
    })
    .from(installment_item_value)
    .innerJoin(installment, eq(installment.id, installment_item_value.fk_id_installment))
    .innerJoin(item_value, eq(item_value.id, installment_item_value.fk_id_item_value))
    .where(eq(item_value.cashflow_type, cashflow_type))
    .all()
    if(!result) return [];
    return result.map(({ id }) => this.findById(id))
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MInstallment["id"], data: IRepoInstallmentUpdateProps): Installment {
    const installment_result = db.update(installment).set(data)
                                  .where(eq(installment_item_value.id, id))
                                  .returning({ id: installment_item_value.id })
                                  .get()
    return this.findById(installment_result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MInstallment["id"]): boolean{
    const result = db.delete(installment).where(eq(installment.id, id)).returning().get()
    return !result ? false : true
  }
}