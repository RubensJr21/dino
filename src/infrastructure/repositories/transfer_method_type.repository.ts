import { TransferMethodType } from '@src/core/entities/transfer_method_type.entity'
import { MTransferMethodType } from '@src/core/models/transfer_method_type.model'
import { TransferMethodTypeNotFoundById, TransferMethodTypeNotFoundByName } from '@src/core/shared/errors/transfer_method_type'
import { IRepositoryWithoutDates, IRepositoryWithoutDatesCreateProps, IRepositoryWithoutDatesUpdateProps } from "@src/core/shared/IRepositoryWithoutDates"
import { db } from '@src/infrastructure/database/drizzle/client'
import { transfer_method_type } from '@src/infrastructure/database/drizzle/schemas'
import { eq } from 'drizzle-orm/sql'

export interface IRepoTransferMethodType extends IRepositoryWithoutDates<MTransferMethodType, TransferMethodType> {
  /**
   * Creates a new transfer method type in the database
   * @param {IRepositoryWithoutDatesCreateProps<MTransferMethodType>} data The data required to create a new transfer method type
   * @returns {TransferMethodType} The newly created transfer method type as a TransferMethodType entity
   */
  create(data: IRepositoryWithoutDatesCreateProps<MTransferMethodType>): TransferMethodType;
  /**
   * Finds a transfer method type by its unique identifier
   * @param {MTransferMethodType["id"]} id The unique identifier of the transfer method type
   * @returns {TransferMethodType} The transfer method type matching the given ID
   * @throws {TransferMethodTypeNotFoundById} If no transfer method type is found with the specified ID
   */
  findById(id: MTransferMethodType["id"]): TransferMethodType;
  /**
   * Finds a transfer method type by its name
   * @param {MTransferMethodType["name"]} name The name of the transfer method type
   * @returns {TransferMethodType} The transfer method type matching the given name
   * @throws {TransferMethodTypeNotFoundByName} If no transfer method type is found with the specified name
   */
  findByName(name: string): MTransferMethodType;
  /**
   * Retrieves all transfer method types from the database
   * @returns {TransferMethodType[]} An array of all transfer method types
   */
  findAll(): TransferMethodType[];
  /**
   * Updates a transfer method type by its ID with the provided data
   * @param {MTransferMethodType["id"]} id The ID of the transfer method type to update
   * @param {IRepositoryWithoutDatesUpdateProps<MTransferMethodType>} data The data to update the transfer method type with
   * @returns {TransferMethodType} The updated transfer method type
   */
  update(id: MTransferMethodType["id"], data: IRepositoryWithoutDatesUpdateProps<MTransferMethodType>): TransferMethodType;
  /**
   * Deletes a transfer method type by its ID
   * @param {MTransferMethodType["id"]} id The ID of the transfer method type to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MTransferMethodType["id"]): boolean;
}

export default class TransferMethodTypeDrizzleRepository implements IRepoTransferMethodType {
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryWithoutDatesCreateProps<MTransferMethodType>): TransferMethodType {
    const tmt = db.insert(transfer_method_type).values(data).returning().get()
    return new TransferMethodType(tmt)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MTransferMethodType["id"]): TransferMethodType {
    const tmt = db.query.transfer_method_type.findFirst({
      where: eq(transfer_method_type.id, id)
    }).sync()
    if(!tmt){
      throw new TransferMethodTypeNotFoundById(id)
    }
    return new TransferMethodType(tmt)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findByName(name: MTransferMethodType["name"]): TransferMethodType {
    const tmt = db.query.transfer_method_type.findFirst({
      where: eq(transfer_method_type.name, name)
    }).sync()
    
    if(!tmt){
      throw new TransferMethodTypeNotFoundByName(name)
    }
    return new TransferMethodType(tmt)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): TransferMethodType[] {
    return db.query.transfer_method_type.findMany().sync().map(tmt => new TransferMethodType(tmt))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MTransferMethodType["id"], data: IRepositoryWithoutDatesUpdateProps<MTransferMethodType>): TransferMethodType {
    const tmt = db.update(transfer_method_type).set(data).where(
      eq(transfer_method_type.id, id)
    ).returning().get()
    return new TransferMethodType(tmt)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MTransferMethodType["id"]): boolean {
    const tmt = db.delete(transfer_method_type).where(
      eq(transfer_method_type.id, id)
    ).returning().get();
    if(!tmt) return false;
    return true;
  }
}