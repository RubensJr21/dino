import { RecurrenceType } from '@src/core/entities/recurrence_type.entity'
import { MRecurrenceType } from '@src/core/models/recurrence_type.model'
import { RecurrenceTypeNotFoundById, RecurrenceTypeNotFoundByType } from '@src/core/shared/errors/recurrence_type'
import { IRepositoryWithoutDates, IRepositoryWithoutDatesCreateProps } from "@src/core/shared/IRepositoryWithoutDates"
import { db } from '@src/infrastructure/database/client'
import { recurrence_type } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

export interface IRepoRecurrenceType extends IRepositoryWithoutDates<MRecurrenceType, RecurrenceType> {
  /**
   * Creates a new recurrence type in the database.
   * @param {IRepositoryWithoutDatesCreateProps<MRecurrenceType>} data The data for creating a new recurrence type
   * @returns {RecurrenceType} The newly created RecurrenceType instance
   */
  create(data: IRepositoryWithoutDatesCreateProps<MRecurrenceType>): RecurrenceType;

  /**
   * Finds a recurrence type by its unique identifier.
   * @param {MRecurrenceType["id"]} id The unique identifier of the recurrence type to find
   * @returns {RecurrenceType} The RecurrenceType matching the given id
   * @throws {RecurrenceTypeNotFoundById} If no recurrence type is found with the specified id
   */
  findById(id: MRecurrenceType["id"]): RecurrenceType;

  /**
   * Finds a recurrence type by its type.
   * @param {MRecurrenceType["type"]} type The type of the recurrence type to find
   * @returns {RecurrenceType} The RecurrenceType matching the given type
   * @throws {RecurrenceTypeNotFoundByType} If no recurrence type is found with the specified type
   */
  findByType(type: string): RecurrenceType;

  /**
   * Retrieves all recurrence types from the database.
   * @returns {RecurrenceType[]} An array of all RecurrenceType instances
   */
  findAll(): RecurrenceType[];

  /**
   * Updates a recurrence type in the database.
   * @param {MRecurrenceType["id"]} id The ID of the recurrence type to update
   * @param {IRepositoryWithoutDatesCreateProps<MRecurrenceType>} data The updated data for the recurrence type
   * @returns {RecurrenceType} The updated RecurrenceType instance
   * @throws {RecurrenceTypeNotFoundById} If no recurrence type is found with the specified ID
   */
  update(id: MRecurrenceType["id"], data: IRepositoryWithoutDatesCreateProps<MRecurrenceType>): RecurrenceType;
  
  /**
   * Deletes a recurrence type by its ID
   * @param {MRecurrenceType["id"]} id The ID of the recurrence type to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MRecurrenceType["id"]): boolean;
}

export default class RecurrenceTypeDrizzleRepository implements IRepoRecurrenceType {
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryWithoutDatesCreateProps<MRecurrenceType>): RecurrenceType {
    const recurrence_type_created = db.insert(recurrence_type).values(data).returning().get()
    return new RecurrenceType(recurrence_type_created)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MRecurrenceType["id"]): RecurrenceType {
    const recurrence_type_searched = db.query.recurrence_type.findFirst({
      where: eq(recurrence_type.id, id)
    }).sync()
    if(!recurrence_type_searched) throw new RecurrenceTypeNotFoundById(id)
    return new RecurrenceType(recurrence_type_searched)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findByType(type: MRecurrenceType["type"]): RecurrenceType {
    const recurrence_type_searched = db.query.recurrence_type.findFirst({
      where: eq(recurrence_type.type, type)
    }).sync()
    if(!recurrence_type_searched) throw new RecurrenceTypeNotFoundByType(type)
    return new RecurrenceType(recurrence_type_searched)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): RecurrenceType[] {
    return db.query.recurrence_type.findMany().sync().map(rt => new RecurrenceType(rt))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MRecurrenceType["id"], data: IRepositoryWithoutDatesCreateProps<MRecurrenceType>): RecurrenceType {
    const result = db.update(recurrence_type).set(data).where(
      eq(recurrence_type.id, id)
    ).returning().get()
    return this.findById(result.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MRecurrenceType["id"]): boolean {
    const results = db.delete(recurrence_type).where(
      eq(recurrence_type.id, id)
    ).returning().get();
    return !results ? false : true;
  }
}