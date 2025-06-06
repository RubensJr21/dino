import { db } from '@infrastructure/database/drizzle/client'
import { base_item_value, item_value } from '@infrastructure/database/drizzle/schemas'
import { ItemValue } from '@src/core/entities/item_value.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethodType } from '@src/core/entities/transfer_method_type.entity'
import { ItemValueNotFoundById } from '@src/core/shared/errors/item_value'
import { IRepoItemValueCreateProps, IRepoItemValueUpdateProps, IRepositoryItemValue } from "@src/core/shared/IRepositoryItemValue"
import { MItemValue } from '@src/infrastructure/models/item_value.model'
import { eq } from 'drizzle-orm/sql'

type MItemValueWithoutAts = StrictOmit<MItemValue, "created_at" | "updated_at">

type MItemValueWithoutDate = StrictOmit<MItemValueWithoutAts, "scheduled_at">

interface MItemValueOutput extends MItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}

export interface IRepoItemValue extends IRepositoryItemValue<MItemValue, ItemValue> {
  /**
   * Creates a new item value in the database
   * @param {IRepoItemValueCreateProps<MItemValue>} data The properties required to create an item value
   * @returns {ItemValue} The newly created ItemValue instance
   */
  create(data: IRepoItemValueCreateProps<MItemValue>): ItemValue;
  /**
   * Retrieves an item value by its unique identifier with associated base item value, tag, and transfer method type
   * @param {MItemValue["id"]} id - The unique identifier of the item value to retrieve
   * @returns {ItemValue} The found item value with populated related entities
   * @throws {ItemValueNotFoundById} If no item value is found with the given ID
   */
  findById(id: MItemValue["id"]): ItemValue;
  /**
   * Retrieves all item values with their associated base item value, tag, and transfer method type
   * @returns {ItemValue[]} An array of ItemValue instances with populated related entities
   */
  findAll(): ItemValue[];
  /**
   * Updates an item value by its ID with the provided data
   * @param {MItemValue["id"]} id - The unique identifier of the item value to update
   * @param {IRepoItemValueUpdateProps<MItemValue>} data - The data to update the item value with
   * @returns {ItemValue} The updated item value, retrieved by its ID after update
   */
  update(id: MItemValue["id"], data: IRepoItemValueUpdateProps<MItemValue>): ItemValue;
  /**
   * Deletes an item value by its ID
   * @param {MItemValue["id"]} id - The unique identifier of the item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MItemValue["id"]): boolean;
}

export default class ItemValueDrizzleRepository implements IRepoItemValue {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private dateToString(d: Date){
    return d.toISOString().split('T')[0]
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatOutput(output: MItemValueOutput): MItemValue {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      scheduled_at: new Date(output.scheduled_at)
    }
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepoItemValueCreateProps<MItemValue>): ItemValue {   
    const base_item_value_result = db.insert(base_item_value).values({
      ...data,
      scheduled_at: this.dateToString(data.scheduled_at)
    }).returning().get()
    
		const result = db.insert(item_value).values({fk_id_base_item_value: base_item_value_result.id}).returning().get()
    return this.findById(result.id)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MItemValue["id"]): ItemValue {
		const result = db.query.item_value.findFirst({
			where: eq(item_value.id, id),
			with: {
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()
		if(!result) throw new ItemValueNotFoundById(id);

		const {
      base_item_value: _,
      // tag_id,
      tag,
      // transfer_method_type_id,
      transfer_method_type,
      ...item_value_searched
    } = {
      ...result.base_item_value,
      ...result,
    } 

    return new ItemValue({
      ...this.formatOutput(item_value_searched),
      tag: new Tag(tag),
      transfer_method_type: new TransferMethodType(transfer_method_type)
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): ItemValue[]{
    const result = db.query.item_value.findMany({
      with: {
        base_item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()
    return result.map((iv) => {
      const {
        base_item_value: _,
        tag,
        transfer_method_type,
        ...item_value_searched
      } = {
        ...iv,
        ...iv.base_item_value,
        base_item_value_id: iv.base_item_value.id
      } 
  
      return new ItemValue({
        ...this.formatOutput(item_value_searched),
        tag: new Tag(tag),
        transfer_method_type: new TransferMethodType(transfer_method_type)
      })
    }) 
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MItemValue["id"], data: IRepoItemValueUpdateProps<MItemValue>): ItemValue {
    const forUpdate = {
      fk_id_base_item_value: data.fk_id_base_item_value
    }
    const results = db.update(item_value).set(forUpdate).where(eq(item_value.id, id)).returning().get()
    return this.findById(results.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MItemValue["id"]): boolean {
    const result = db.delete(item_value).where(eq(item_value.id, id)).get()
    return !result ? false: true;
  }
}