import { ItemValue } from '@src/core/entities/item_value.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethod } from '@src/core/entities/transfer_method.entity'
import { MItemValue } from '@src/core/models/item_value.model'
import { ItemValueNotFoundById } from '@src/core/shared/errors/item_value'
import { db } from '@src/infrastructure/database/client'
import { item_value } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

type IRepoItemValueCreateProps = StrictOmit<MItemValue, "id"|"created_at"|"updated_at">
type IRepoItemValueUpdateProps = StrictOmit<MItemValue, "id"|"created_at"|"updated_at">

export interface IRepoItemValue {
  /**
   * Creates a new base item value record in the database
   * @param {IRepoItemValueCreateProps} data - The data for creating a new base item value
   * @returns {MItemValue} The newly created base item value with its assigned ID
   */
  create(data: IRepoItemValueCreateProps): ItemValue;

  /**
   * Finds a base item value by its unique identifier
   * @param {MItemValue["id"]} id - The unique identifier of the base item value to retrieve
   * @returns {MItemValue} The base item value with the specified ID
   * @throws {ItemValueNotFoundById} If no base item value is found with the given ID
   */
  findById(id: MItemValue["id"]): ItemValue;

  /**
   * Retrieves all base item value records from the database
   * @returns {ItemValue[]} An array of base item values
   */
  findAll(): ItemValue[];

  /**
   * Updates an existing base item value record in the database
   * @param {MItemValue["id"]} id - The unique identifier of the base item value to update
   * @param {IRepoItemValueCreateProps} data - The updated data for the base item value
   * @returns {MItemValue} The updated base item value with its current details
   */
  update(id: MItemValue["id"], data: IRepoItemValueUpdateProps): ItemValue;

  /**
   * Deletes a base item value record from the database by its unique identifier
   * @param {MItemValue["id"]} id - The unique identifier of the base item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MItemValue["id"]): boolean;
}

export default class ItemValueDrizzleRepository implements IRepoItemValue {  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepoItemValueCreateProps): ItemValue {
		const { id } = db.insert(item_value).values(data).returning({id: item_value.id}).get()
    return this.findById(id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MItemValue["id"]): ItemValue {
		const result = db.query.item_value.findFirst({
			where: eq(item_value.id, id),
      with: {
        transfer_method: true,
        tag: true
      }
    }).sync()
		if(!result) throw new ItemValueNotFoundById(id)

    const {id: _, ...biv} = {...result, item_value_id: result.id}

    return new ItemValue({
		id: result.id,
		description: result.description,
		cashflow_type: result.cashflow_type,
		scheduled_at: result.scheduled_at,
		amount: result.amount,
		was_processed: result.was_processed,
		transfer_method: new TransferMethod(result.transfer_method),
		tag: new Tag(result.tag),
    created_at: result.created_at,
    updated_at: result.updated_at
	})
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): ItemValue[] {
    const results = db.query.item_value.findMany({
      columns: {
        id: true
      }
    }).sync()
    return results.map(({ id } ) => this.findById(id))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MItemValue["id"], data: IRepoItemValueCreateProps): ItemValue {
    db.update(item_value).set(data).where(eq(item_value.id, id)).returning().get()
    return this.findById(id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MItemValue["id"]): boolean {
    const results = db.delete(item_value).where(eq(item_value.id, id)).returning().get();
    return !results ? false : true;
  }
}