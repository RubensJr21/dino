import { IEntityWithDates } from "./IEntityWithDates";

export type IRepositoryCreateProps<T extends IEntityWithDates> = StrictOmit<T, "id"|"created_at"|"updated_at">
export type IRepositoryUpdateProps<T extends IEntityWithDates> = StrictOmit<T, "id"|"created_at"|"updated_at">

/**
 * Defines a generic repository interface for CRUD operations on entities with date tracking.
 * @template T The type of the input entity with date tracking.
 * @template U The type of the output entity with date tracking.
 */
export interface IRepository<T extends IEntityWithDates, U extends IEntityWithDates> {
  /**
   * Creates a new entity with the provided data.
   * @param data The data used to create the new entity, excluding system-generated fields.
   * @returns The newly created entity.
   */
  create(data: IRepositoryCreateProps<T>): U;
  
  /**
   * Retrieves a single entity by its unique identifier.
   * @param id The unique identifier of the entity to retrieve.
   * @returns The entity with the specified identifier, or undefined if not found.
   */
  findById(id: T["id"]): U;
  
  /**
   * Retrieves all entities of the specified type.
   * @returns An array of all entities.
   */
  findAll(): U[];
  
  /**
   * Updates an existing entity with the provided data.
   * @param id The unique identifier of the entity to update.
   * @param data The data used to update the entity, excluding system-generated fields.
   * @returns The updated entity.
   */
  update(id: T["id"], data: IRepositoryUpdateProps<T>): U; 
  
  /**
   * Deletes an entity by its unique identifier.
   * @param id The unique identifier of the entity to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  delete(id: T["id"]): boolean;
}