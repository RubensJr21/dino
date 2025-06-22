import { TransferMethod } from '@src/core/entities/transfer_method.entity'
import { MTransferMethod } from '@src/core/models/transfer_method.model'
import { TransferMethodNotFoundById, TransferMethodNotFoundByNickname } from '@src/core/shared/errors/transfer_method'
import { IRepositoryWithDates, IRepositoryWithDatesCreateProps, IRepositoryWithDatesUpdateProps } from '@src/core/shared/interfaces/IRepositoryWithDates'
import { db } from '@src/infrastructure/database/client'
import { transfer_method } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

export interface IRepoTransferMethod extends IRepositoryWithDates<MTransferMethod, TransferMethod> {
  /**
   * Creates a new transfer method type in the database
   * @param {IRepositoryWithDatesCreateProps<MTransferMethod>} data The data required to create a new transfer method type
   * @returns {TransferMethod} The newly created transfer method type as a TransferMethod entity
   */
  create(data: IRepositoryWithDatesCreateProps<MTransferMethod>): TransferMethod;
  /**
   * Finds a transfer method type by its unique identifier
   * @param {MTransferMethod["id"]} id The unique identifier of the transfer method type
   * @returns {TransferMethod} The transfer method type matching the given ID
   * @throws {TransferMethodNotFoundById} If no transfer method type is found with the specified ID
   */
  findById(id: MTransferMethod["id"]): TransferMethod;
  /**
   * Finds a transfer method type by its name
   * @param {MTransferMethod["name"]} name The name of the transfer method type
   * @returns {TransferMethod} The transfer method type matching the given name
   * @throws {TransferMethodNotFoundByName} If no transfer method type is found with the specified name
   */
  findByNickname(name: string): MTransferMethod;
  /**
   * Retrieves all transfer method types from the database
   * @returns {TransferMethod[]} An array of all transfer method types
   */
  findAll(): TransferMethod[];
  /**
   * Updates a transfer method type by its ID with the provided data
   * @param {MTransferMethod["id"]} id The ID of the transfer method type to update
   * @param {IRepositoryWithDatesUpdateProps<MTransferMethod>} data The data to update the transfer method type with
   * @returns {TransferMethod} The updated transfer method type
   */
  update(id: MTransferMethod["id"], data: IRepositoryWithDatesUpdateProps<MTransferMethod>): TransferMethod;
  /**
   * Deletes a transfer method type by its ID
   * @param {MTransferMethod["id"]} id The ID of the transfer method type to delete
   * @returns {boolean} Indicates whether the deletion was successful
   */
  delete(id: MTransferMethod["id"]): boolean;
}

export default class TransferMethodDrizzleRepository implements IRepoTransferMethod {
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryWithDatesCreateProps<MTransferMethod>): TransferMethod {
    const tmt = db.insert(transfer_method).values(data).returning().get()
    return new TransferMethod(tmt)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MTransferMethod["id"]): TransferMethod {
    const tmt = db.query.transfer_method.findFirst({
      where: eq(transfer_method.id, id)
    }).sync()
    if(!tmt){
      throw new TransferMethodNotFoundById(id)
    }
    return new TransferMethod(tmt)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findByNickname(nickname: MTransferMethod["nickname"]): TransferMethod {
    const tmt = db.query.transfer_method.findFirst({
      where: eq(transfer_method.nickname, nickname)
    }).sync()
    
    if(!tmt){
      throw new TransferMethodNotFoundByNickname(nickname)
    }
    return new TransferMethod(tmt)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): TransferMethod[] {
    return db.query.transfer_method.findMany().sync().map(tmt => new TransferMethod(tmt))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MTransferMethod["id"], data: IRepositoryWithDatesUpdateProps<MTransferMethod>): TransferMethod {
    const tmt = db.update(transfer_method).set(data).where(
      eq(transfer_method.id, id)
    ).returning().get()
    return new TransferMethod(tmt)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MTransferMethod["id"]): boolean {
    const tmt = db.delete(transfer_method).where(
      eq(transfer_method.id, id)
    ).returning().get();
    if(!tmt) return false;
    return true;
  }
}