import { MItemValue } from '@src/core/models/item_value.model'
import { ItemValueNotFoundById } from '@src/core/shared/errors/item_value'
import { db } from '@src/infrastructure/database/client'
import { item_value } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

type IRepoItemValueCreateProps = StrictOmit<MItemValue, "id"|"created_at"|"updated_at">
type IRepoItemValueUpdateProps = StrictOmit<MItemValue, "id"|"created_at"|"updated_at">

export interface IRepositoryItemValue {
  /**
   * Creates a new base item value record in the database
   * @param {IRepoItemValueCreateProps} data - The data for creating a new base item value
   * @returns {MItemValue} The newly created base item value with its assigned ID
   */
  create(data: IRepoItemValueCreateProps): MItemValue;

  /**
   * Finds a base item value by its unique identifier
   * @param {MItemValue["id"]} id - The unique identifier of the base item value to retrieve
   * @returns {MItemValue} The base item value with the specified ID
   * @throws {ItemValueNotFoundById} If no base item value is found with the given ID
   */
  findById(id: MItemValue["id"]): MItemValue;

  /**
   * Retrieves all base item value records from the database
   * @returns {MItemValue[]} An array of base item values
   */
  findAll(): MItemValue[];

  /**
   * Updates an existing base item value record in the database
   * @param {MItemValue["id"]} id - The unique identifier of the base item value to update
   * @param {IRepoItemValueCreateProps} data - The updated data for the base item value
   * @returns {MItemValue} The updated base item value with its current details
   */
  update(id: MItemValue["id"], data: IRepoItemValueUpdateProps): MItemValue;

  /**
   * Deletes a base item value record from the database by its unique identifier
   * @param {MItemValue["id"]} id - The unique identifier of the base item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MItemValue["id"]): boolean;
}

type MItemValueWithoutAts = StrictOmit<MItemValue, "id"|"created_at" | "updated_at">

type MItemValueWithoutDate = StrictOmit<MItemValueWithoutAts, "scheduled_at">

interface MItemValueInput extends MItemValueWithoutDate {
  scheduled_at: string;
}
interface MItemValueOutput extends MItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}

export default class ItemValueDrizzleRepository implements IRepositoryItemValue {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatInput(input: MItemValueWithoutAts): MItemValueInput {
    return {
      ...input,
      scheduled_at: input.scheduled_at.toISOString().split('T')[0]
    }
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatOutput(output: MItemValueOutput): StrictOmit<MItemValue, "id"> {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      scheduled_at: new Date(output.scheduled_at)
    }
  }

  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepoItemValueCreateProps): MItemValue {
    const forInsert = this.formatInput(data)
		const item_value_searched = db.insert(item_value).values(forInsert).returning().get()
    
    return {
      id: item_value_searched.id,
      ...this.formatOutput(item_value_searched),
    }
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MItemValue["id"]): MItemValue {
		const result = db.query.item_value.findFirst({
			where: eq(item_value.id, id),
    }).sync()
		if(!result) throw new ItemValueNotFoundById(id)

    const {id: _, ...biv} = {...result, item_value_id: result.id}

    return {
      id: result.id,
      ...this.formatOutput(biv)
    }
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): MItemValue[] {
    const results = db.query.item_value.findMany().sync()
    return results.map(biv => {
      return {
        id: biv.id,
        ...this.formatOutput(biv)
      }
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MItemValue["id"], data: IRepoItemValueCreateProps): MItemValue {
    const forUpdate = this.formatInput(data)
    db.update(item_value).set(forUpdate).where(eq(item_value.id, id)).returning().get()
    return this.findById(id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MItemValue["id"]): boolean {
    const results = db.delete(item_value).where(eq(item_value.id, id)).returning().get();
    return !results ? false : true;
  }
}