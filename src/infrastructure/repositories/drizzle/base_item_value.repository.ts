import { db } from '@infrastructure/database/drizzle/client'
import { base_item_value, item_value } from '@infrastructure/database/drizzle/schemas'
import { BaseItemValueNotFoundById } from '@src/core/shared/errors/base_item_value'
import { MBaseItemValue } from '@src/infrastructure/models/base_item_value.model'
import { eq } from 'drizzle-orm/sql'

type MBaseItemValueCustom = StrictOmit<MBaseItemValue, "fk_id_base_item_value">

type IRepoBaseItemValueCreateProps = StrictOmit<MBaseItemValueCustom, "id"|"created_at"|"updated_at">
type IRepoBaseItemValueUpdateProps = StrictOmit<MBaseItemValueCustom, "id"|"created_at"|"updated_at">

export interface IRepositoryBaseItemValue {
  /**
   * Creates a new base item value record in the database
   * @param {IRepoBaseItemValueCreateProps} data - The data for creating a new base item value
   * @returns {MBaseItemValueCustom} The newly created base item value with its assigned ID
   */
  create(data: IRepoBaseItemValueCreateProps): MBaseItemValueCustom;

  /**
   * Finds a base item value by its unique identifier
   * @param {MBaseItemValueCustom["id"]} id - The unique identifier of the base item value to retrieve
   * @returns {MBaseItemValueCustom} The base item value with the specified ID
   * @throws {BaseItemValueNotFoundById} If no base item value is found with the given ID
   */
  findById(id: MBaseItemValueCustom["id"]): MBaseItemValueCustom;

  /**
   * Retrieves all base item value records from the database
   * @returns {MBaseItemValueCustom[]} An array of base item values
   */
  findAll(): MBaseItemValueCustom[];

  /**
   * Updates an existing base item value record in the database
   * @param {MBaseItemValueCustom["id"]} id - The unique identifier of the base item value to update
   * @param {IRepoBaseItemValueCreateProps} data - The updated data for the base item value
   * @returns {MBaseItemValueCustom} The updated base item value with its current details
   */
  update(id: MBaseItemValueCustom["id"], data: IRepoBaseItemValueUpdateProps): MBaseItemValueCustom;

  /**
   * Deletes a base item value record from the database by its unique identifier
   * @param {MBaseItemValueCustom["id"]} id - The unique identifier of the base item value to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MBaseItemValueCustom["id"]): boolean;
}

type MBaseItemValueWithoutAts = StrictOmit<MBaseItemValueCustom, "id"|"created_at" | "updated_at">

type MBaseItemValueWithoutDate = StrictOmit<MBaseItemValueWithoutAts, "scheduled_at">

interface MBaseItemValueInput extends MBaseItemValueWithoutDate {
  scheduled_at: string;
}
interface MBaseItemValueOutput extends MBaseItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}

export default class BaseItemValueDrizzleRepository implements IRepositoryBaseItemValue {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatInput(input: MBaseItemValueWithoutAts): MBaseItemValueInput {
    return {
      ...input,
      scheduled_at: input.scheduled_at.toISOString().split('T')[0]
    }
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatOutput(output: MBaseItemValueOutput): StrictOmit<MBaseItemValueCustom, "id"> {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      scheduled_at: new Date(output.scheduled_at)
    }
  }

  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepoBaseItemValueCreateProps): MBaseItemValueCustom {
    const forInsert = this.formatInput(data)
		const base_item_value_searched = db.insert(base_item_value).values(forInsert).returning().get()
    
    return {
      id: base_item_value_searched.id,
      ...this.formatOutput(base_item_value_searched),
    }
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MBaseItemValueCustom["id"]): MBaseItemValueCustom {
		const result = db.query.base_item_value.findFirst({
			where: eq(base_item_value.id, id),
    }).sync()
		if(!result) throw new BaseItemValueNotFoundById(id)

    const {id: _, ...biv} = {...result, base_item_value_id: result.id}

    return {
      id: result.id,
      ...this.formatOutput(biv)
    }
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): MBaseItemValueCustom[] {
    const results = db.query.base_item_value.findMany().sync()
    return results.map(biv => {
      return {
        id: biv.id,
        ...this.formatOutput(biv)
      }
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MBaseItemValueCustom["id"], data: IRepoBaseItemValueCreateProps): MBaseItemValueCustom {
    const forUpdate = this.formatInput(data)
    db.update(base_item_value).set(forUpdate).where(eq(base_item_value.id, id)).returning().get()
    return this.findById(id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MBaseItemValueCustom["id"]): boolean {
    const results = db.delete(item_value).where(eq(item_value.id, id)).returning().get();
    return !results ? false : true;
  }
}