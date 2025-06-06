import IEntityBase from "./IEntityBase";

export type IRepositoryWithoutDatesCreateProps<T extends IEntityBase> = StrictOmit<T, "id">;
export type IRepositoryWithoutDatesUpdateProps<T extends IEntityBase> = StrictOmit<T, "id">;

/**
 * Defines a repository interface for managing entities without date tracking
 * @template T The type of the input entity extending {@link IEntityBase}
 * @template U The type of the output entity extending {@link IEntityBase}
 * @description Provides standard CRUD operations for repositories that do not track dates
 */
export interface IRepositoryWithoutDates<T extends IEntityBase, U extends IEntityBase> {
  /**
   * Creates a new record in the repository using the provided data
   * @param data The data for creating a new record, excluding the 'id' property
   * @returns The newly created record of type U
   */
  create(data: IRepositoryWithoutDatesCreateProps<T>): U;
  /**
   * Retrieves a single record from the repository by its unique identifier
   * @param id The unique identifier of the record to retrieve
   * @returns The record of type U matching the provided identifier, or undefined if not found
   */
  findById(id: T["id"]): U;
  /**
   * Retrieves all records from the repository
   * @returns An array of records of type U
   */
  findAll(): U[];
  /**
   * Updates an existing record in the repository using the provided identifier and data
   * @param id The unique identifier of the record to update
   * @param data The updated data for the record, excluding the 'id' property
   * @returns The updated record of type U
   */
  update(id: T["id"], data: IRepositoryWithoutDatesUpdateProps<T>): U;
  /**
   * Deletes a record from the repository by its unique identifier
   * @param id The unique identifier of the record to delete
   * @returns A boolean indicating whether the deletion was successful
   */
  delete(id: T["id"]): boolean;
}
