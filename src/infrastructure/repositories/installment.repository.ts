import { Installment } from '@src/core/entities/installment.entity'
import { ItemValue } from '@src/core/entities/item_value.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethodType } from '@src/core/entities/transfer_method_type.entity'
import { MInstallment } from '@src/core/models/installment.model'
import { InstallmentItemValueNotFoundById } from '@src/core/shared/errors/installment'
import { IRepoInstallment, IRepoInstallmentCreateProps, IRepoInstallmentUpdateProps } from '@src/core/shared/IRepositoryInstallment'
import { db } from '@src/infrastructure/database/drizzle/client'
import { installment, item_value } from '@src/infrastructure/database/drizzle/schemas'
import { installment_item_value } from '@src/infrastructure/database/drizzle/schemas/installment_item_value.schema'
import { eq } from 'drizzle-orm/sql'

export default class InstallmentDrizzleRepository implements IRepoInstallment {   
  // eslint-disable-next-line jsdoc/require-jsdoc
  private dateToString(d: Date){
    return d.toISOString().split('T')[0]
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public create({
      installments_number,
      total_amount,
      itens
    }: IRepoInstallmentCreateProps): Installment {

    const installment_result = db.insert(installment).values({
      installments_number: installments_number,
      total_amount: total_amount
    }).returning({ id: installment.id }).get()

    itens.forEach(_item_value => {
      const item_value_result = db.insert(item_value).values({
        id: _item_value.id,
        description: _item_value.description,
        type: _item_value.type,
        scheduled_at: this.dateToString(_item_value.scheduled_at),
        amount: _item_value.amount,
        was_processed: _item_value.was_processed,
        fk_id_transfer_method_type: _item_value.transfer_method_type.id,
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
    const installment_item_value_result = db.query.installment_item_value.findMany({
      where: eq(installment_item_value.id, id),
      with: {
        item_value: {
          with: {
            tag: true,
            transfer_method_type: true,
          }
        },
        installment: true
      }
    }).sync()
    if(!installment_item_value_result) throw new InstallmentItemValueNotFoundById(id);

    const itens = installment_item_value_result.map(_installment => {
      return new ItemValue({
        id: _installment.item_value.id,
        description: _installment.item_value.description,
        type: _installment.item_value.type,
        scheduled_at: new Date(_installment.item_value.scheduled_at),
        amount: _installment.item_value.amount,
        was_processed: _installment.item_value.was_processed,
        transfer_method_type: new TransferMethodType(_installment.item_value.transfer_method_type),
        tag: new Tag(_installment.item_value.tag),
        created_at: new Date(_installment.item_value.created_at),
        updated_at: new Date(_installment.item_value.updated_at),
      })
    })

    return new Installment({
      id,
      total_amount: installment_item_value_result[0].installment.total_amount,
      itens,
      installments_number: installment_item_value_result[0].installment.installments_number,
      created_at: new Date(installment_item_value_result[0].installment.created_at),
      updated_at: new Date(installment_item_value_result[0].installment.updated_at),
    })
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): Installment[]{
    const result = db.query.recurring_item_value.findMany({
      columns: { id: true }
    }).sync()
    return result.map((riv) => this.findById(riv.id)) 
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