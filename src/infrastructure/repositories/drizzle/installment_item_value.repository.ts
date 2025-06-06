import { db } from '@infrastructure/database/drizzle/client'
import { base_item_value, installment_item_value } from '@infrastructure/database/drizzle/schemas'
import { InstallmentItemValue } from '@src/core/entities/installment_item_value.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethodType } from '@src/core/entities/transfer_method_type.entity'
import { InstallmentItemValueNotFoundById } from '@src/core/shared/errors/installment_item_value'
import { IRepoItemValueCreateProps, IRepoItemValueUpdateProps, IRepositoryItemValue } from "@src/core/shared/IRepositoryItemValue"
import { MInstallmentItemValue } from '@src/infrastructure/models/installment_item_value.model'
import { eq } from 'drizzle-orm/sql'

type MInstallmentItemValueWithoutAts = StrictOmit<MInstallmentItemValue, "created_at" | "updated_at">

type MInstallmentItemValueWithoutDate = StrictOmit<MInstallmentItemValueWithoutAts, "scheduled_at">

interface MInstallmentItemValueInput extends MInstallmentItemValueWithoutDate {
  scheduled_at: string;
}
interface MInstallmentItemValueOutput extends MInstallmentItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}
 
export interface IRepoInstallmentItemValue extends IRepositoryItemValue<MInstallmentItemValue, InstallmentItemValue> {
  /**
   * Creates a new installment item value with its associated base item value
   * @param {IRepoItemValueCreateProps<MInstallmentItemValue>} data The data required to create an installment item value
   * @returns {InstallmentItemValue} The newly created installment item value
   */
  create(data: IRepoItemValueCreateProps<MInstallmentItemValue>): InstallmentItemValue;

  /**
   * @param {MInstallmentItemValue["id"]} id id do InstalmentValueItem a ser recuperado
   * @throws {InstallmentItemValueNotFoundById}
   * @returns {InstallmentItemValue} entidade que representa InstallmentItemValue
   */
  findById(id: MInstallmentItemValue["id"]): InstallmentItemValue;

  /**
   * Retrieves all installment item values with their associated base item values, tags, and transfer method types
   * @returns {InstallmentItemValue[]} An array of InstallmentItemValue instances
   */
  findAll(): InstallmentItemValue[];

  /**
   * Updates an installment item value and its associated base item value
   * @param {MInstallmentItemValue["id"]} id The identifier of the installment item value to update
   * @param {IRepoItemValueUpdateProps<MInstallmentItemValue>} data The update properties for the installment item value and base item value
   * @returns {InstallmentItemValue} The updated InstallmentItemValue instance
   */
  update(id: MInstallmentItemValue["id"], data: IRepoItemValueUpdateProps<MInstallmentItemValue>): InstallmentItemValue;

  /**
   * Deletes an installment item value by its identifier
   * @param {MInstallmentItemValue["id"]} id The identifier of the installment item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MInstallmentItemValue["id"]): boolean;
}

export default class InstallmentItemValueDrizzleRepository implements IRepoInstallmentItemValue {   
  // eslint-disable-next-line jsdoc/require-jsdoc
  private dateToString(d: Date){
    return d.toISOString().split('T')[0]
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatOutput(output: MInstallmentItemValueOutput): MInstallmentItemValue {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      scheduled_at: new Date(output.scheduled_at)
    }
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepoItemValueCreateProps<MInstallmentItemValue>): InstallmentItemValue {
    const {
      installments_number,
      ...base_item_value_values
    } = data
    
    const base_item_value_result = db.insert(base_item_value).values({
      ...base_item_value_values,
      scheduled_at: this.dateToString(base_item_value_values.scheduled_at)
    }).returning().get()
    
    const installment_item_value_result = db.insert(installment_item_value).values({
      fk_id_base_item_value: base_item_value_result.id,
      installments_number: data.installments_number
    }).returning().get()

    return this.findById(installment_item_value_result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MInstallmentItemValue["id"]): InstallmentItemValue {
    const result = db.query.installment_item_value.findFirst({
      where: eq(installment_item_value.id, id),
      with: {
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()
    if(!result) throw new InstallmentItemValueNotFoundById(id);

    const {
      base_item_value: _,
      tag,
      transfer_method_type,
      ...installment_item_value_searched
    } = {
      ...result,
      ...result.base_item_value,
      base_item_value_id: result.base_item_value.id
    }

    const {
      fk_id_tag,
      fk_id_transfer_method_type,
      ...parsed
    } ={
      ...this.formatOutput(installment_item_value_searched),
      tag: new Tag(tag),
      transfer_method_type: new TransferMethodType(transfer_method_type)
    }

    return new InstallmentItemValue(parsed)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): InstallmentItemValue[]{
    const result = db.query.installment_item_value.findMany({
      with: {
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()
    return result.map((iiv) => {
      const {
        base_item_value: _,
        tag,
        transfer_method_type,
        ...installment_item_value_searched
      } = {
        ...iiv,
        ...iiv.base_item_value,
        base_item_value_id: iiv.base_item_value.id
      }
  
      return new InstallmentItemValue({
        ...this.formatOutput(installment_item_value_searched),
        tag: new Tag(iiv.base_item_value.tag),
        transfer_method_type: new TransferMethodType(iiv.base_item_value.transfer_method_type)
      })
    }) 
  }

  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MInstallmentItemValue["id"], data: IRepoItemValueUpdateProps<MInstallmentItemValue>): InstallmentItemValue {
    const {
      installments_number,
      fk_id_base_item_value,
      ...base_item_value_values
    } = data
    
    const base_item_value_result = db.update(base_item_value).set({
      ...base_item_value_values,
      scheduled_at: this.dateToString(base_item_value_values.scheduled_at)
    }).where(eq(base_item_value.id, fk_id_base_item_value)).returning().get()

    const installment_item_value_result = db.update(installment_item_value).set({
      fk_id_base_item_value,
      installments_number
    }).where(eq(installment_item_value.id, id)).returning().get()

    return this.findById(installment_item_value_result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MInstallmentItemValue["id"]): boolean{
    const result = db.delete(installment_item_value).where(eq(installment_item_value.id, id)).returning().get()
    return !result ? false : true
  }
}