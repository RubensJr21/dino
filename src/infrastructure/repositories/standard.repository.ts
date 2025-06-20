import { ItemValue } from '@src/core/entities/item_value.entity'
import { Standard } from '@src/core/entities/standard.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethodType } from '@src/core/entities/transfer_method_type.entity'
import { MStandard } from '@src/core/models/standard.model'
import { StandardItemValueNotFoundById } from '@src/core/shared/errors/standard'
import { IRepoStandard, IRepoStandardCreateProps, IRepoStandardUpdateProps } from "@src/core/shared/IRepositoryStandard"
import { db } from '@src/infrastructure/database/client'
import { item_value, standard } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

export interface IRepoItemValue extends IRepoStandard {
  /**
   * Creates a new item value in the database
   * @param {IRepoStandardCreateProps} data The properties required to create an item value
   * @returns {Standard} The newly created Standard instance
   */
  create(data: IRepoStandardCreateProps): Standard;
  /**
   * Retrieves an item value by its unique identifier with associated base item value, tag, and transfer method type
   * @param {MStandard["id"]} id - The unique identifier of the item value to retrieve
   * @returns {Standard} The found item value with populated related entities
   * @throws {StandardItemValueNotFoundById} If no item value is found with the given ID
   */
  findById(id: MStandard["id"]): Standard;
  /**
   * Retrieves all item values with their associated base item value, tag, and transfer method type
   * @returns {Standard[]} An array of Standard instances with populated related entities
   */
  findAll(): Standard[];
  /**
   * Updates an item value by its ID with the provided data
   * @param {MStandard["id"]} id - The unique identifier of the item value to update
   * @param {IRepoStandardUpdateProps} data - The data to update the item value with
   * @returns {Standard} The updated item value, retrieved by its ID after update
   */
  update(id: MStandard["id"], data: IRepoStandardUpdateProps): Standard;
  /**
   * Deletes an item value by its ID
   * @param {MStandard["id"]} id - The unique identifier of the item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MStandard["id"]): boolean;
}

export default class ItemValueDrizzleRepository implements IRepoItemValue {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private dateToString(d: Date){
    return d.toISOString().split('T')[0]
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepoStandardCreateProps): Standard {
    const item_value_result = db.insert(item_value).values({
      id: data.item_value.id,
      description: data.item_value.description,
      type: data.item_value.type,
      scheduled_at: this.dateToString(data.item_value.scheduled_at),
      amount: data.item_value.amount,
      was_processed: data.item_value.was_processed,
      fk_id_transfer_method_type: data.item_value.fk_id_transfer_method_type,
      fk_id_tag: data.item_value.fk_id_tag
    }).returning().get()

		const result = db.insert(standard)
                      .values({fk_id_item_value: item_value_result.id})
                      .returning({ id: standard.id })
                      .get()
    return this.findById(result.id)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MStandard["id"]): Standard {
		const result = db.query.standard.findFirst({
			where: eq(standard.id, id),
			with: {
        item_value: {
          with: {
            tag: true,
            transfer_method_type: true
          }
        }
      }
    }).sync()
		if(!result) throw new StandardItemValueNotFoundById(id);

    return new Standard({
      id: result.id,
      item_value: new ItemValue({
        id: result.item_value.id,
        description: result.item_value.description,
        type: result.item_value.type,
        scheduled_at: new Date(result.item_value.scheduled_at),
        amount: result.item_value.amount,
        was_processed: result.item_value.was_processed,
        transfer_method_type: new TransferMethodType(result.item_value.transfer_method_type),
        tag: new Tag(result.item_value.tag),
        created_at: new Date(result.item_value.created_at),
        updated_at: new Date(result.item_value.updated_at)
      }),
      created_at: new Date(result.created_at),
      updated_at: new Date(result.updated_at)
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): Standard[]{
    const result = db.query.standard.findMany({
      columns: { id: true }
    }).sync()
    return result.map((iv) => this.findById(iv.id)) 
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MStandard["id"], data: IRepoStandardUpdateProps): Standard {
    const forUpdate = {
      fk_id_item_value: data.item_value.id
    }
    const results = db.update(standard).set(forUpdate).where(eq(standard.id, id)).returning().get()
    return this.findById(results.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MStandard["id"]): boolean {
    const result = db.delete(standard).where(eq(standard.id, id)).get()
    return !result ? false: true;
  }
}