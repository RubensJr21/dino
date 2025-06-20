import { BankAccount, IBankAccount } from "@src/core/entities/bank_account.entity";
import { MBankAccount } from "@src/core/models/bank_account.model";
import { BankAccountNotFoundByNickname } from "@src/core/shared/errors/bank_account";
import { IRepository, IRepositoryCreateProps, IRepositoryUpdateProps } from "@src/core/shared/IRepository";
import { db } from "@src/infrastructure/database/drizzle/client";
import { bank_account } from "@src/infrastructure/database/drizzle/schemas";
import { eq } from "drizzle-orm/sql";

type MBankAccountWithoutAts = StrictOmit<IBankAccount, "created_at" | "updated_at">

interface MBankAccountOutput extends MBankAccountWithoutAts {
  created_at: string;
  updated_at: string;
}

export interface IRepoBankAccount extends IRepository<MBankAccount, BankAccount> {
  /**
   * @param {IRepositoryWithoutDatesCreateProps<MBankAccount>} data Atributos que são passados para a criação de uma nova BankAccount
   * @returns {BankAccount} Retorna objeto que representa a entidade BankAccount que contém os dados informados para criação
   */
  create(data: IRepositoryCreateProps<MBankAccount>): BankAccount
  
  /**
   * @param {MBankAccount["id"]} id id pelo qual a bank account será buscada
   * @throws {BankAccountNotFoundById}
   * @returns {BankAccount} Retorna objeto que representa a entidade BankAccount que contém o id informado
   */
  findById(id: MBankAccount["id"]): BankAccount

  /**
   * @param {MBankAccount["nickname"]} nickname descrição pela qual a bank account será procurada
   * @throws {BankAccountNotFoundByNickname}
   * @returns {BankAccount} Retorna objeto que representa a entidade BankAccount que contém a nickname informada
   */
  findByNickname(nickname: MBankAccount["nickname"]): BankAccount

  /**
   * @returns {BankAccount[]} retorna uma lista de BankAccounts
   */
  findAll(): BankAccount[]

  /**
   * @param {MBankAccount["id"]} id id pela qual a BankAccount será buscada
   * @param {IRepositoryWithoutDatesUpdateProps<MBankAccount>} data valores que serão atualizado
   * @throws {BankAccountNotFoundById}
   * @returns {BankAccount} Retorna um objeto que representa a entidade BankAccount que contém a id informada
   */
  update(id: MBankAccount["id"], data: IRepositoryUpdateProps<MBankAccount>): BankAccount

  /**
   * @param {MBankAccount["id"]} id id da BankAccount a ser excluída
   * @returns {boolean} retorna true se conseguiu excluir e false caso contrário
   */
  delete(id: MBankAccount["id"]): boolean
}


export default class BankAccountDrizzleRepository implements IRepoBankAccount {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatOutput(output: MBankAccountOutput): IBankAccount {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at)
    }
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryCreateProps<MBankAccount>): BankAccount {
    const result = db.insert(bank_account).values(data).returning().get()
    return new BankAccount(this.formatOutput(result))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MBankAccount["id"]): BankAccount {
    const result = db.query.bank_account.findFirst({
      where: eq(bank_account.id, id)
    }).sync()
    if(!result) throw new Error();
    return new BankAccount(this.formatOutput(result))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findByNickname(nickname: MBankAccount["nickname"]): BankAccount {
    const result = db.query.bank_account.findFirst({where: eq(bank_account.nickname, nickname)}).sync()
    if(!result) throw new BankAccountNotFoundByNickname(nickname);
    return new BankAccount(this.formatOutput(result))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): BankAccount[] {
    const results = db.query.bank_account.findMany().sync()
    return results.map(this.formatOutput).map(ba => new BankAccount(ba))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MBankAccount["id"], data: IRepositoryUpdateProps<MBankAccount>): BankAccount {
    const results = db.update(bank_account).set(data).where(
      eq(bank_account.id, id)
    ).returning().get()
    if(!results) throw new Error();
    return this.findById(id)

  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MBankAccount["id"]): boolean {
    const results = db.delete(bank_account).where(
      eq(bank_account.id, id)
    ).returning().get()
    return !results ? false : true
  }
}