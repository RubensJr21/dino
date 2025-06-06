import { CreditCard } from "@src/core/entities/credit_card.entity";
import { CreditCardNotFoundById, CreditCardNotFoundByNickname } from "@src/core/shared/errors/credit_card";
import { IRepository, IRepositoryCreateProps, IRepositoryUpdateProps } from "@src/core/shared/IRepository";
import { db } from "@src/infrastructure/database/drizzle/client";
import { credit_card } from "@src/infrastructure/database/drizzle/schemas";
import { MCreditCard } from "@src/infrastructure/models/credit_card.model";
import { eq } from "drizzle-orm/sql";

interface MCreditCardInput extends StrictOmit<IRepositoryCreateProps<MCreditCard>, "closing_date" | "due_date"> {
  closing_date: string;
  due_date: string;
}

interface MCreditCardOutput extends StrictOmit<MCreditCard, "closing_date" | "due_date"|"created_at"|"updated_at"> {
  created_at: string;
  updated_at: string;
  closing_date: string;
  due_date: string;
}

export interface IRepoCreditCard extends IRepository<MCreditCard, CreditCard> {
  /**
   * @param {IRepositoryWithoutDatesCreateProps<MCreditCard>} data Atributos que são passados para a criação de uma nova CreditCard
   * @returns {CreditCard} Retorna objeto que representa a entidade CreditCard que contém os dados informados para criação
   */
  create(data: IRepositoryCreateProps<MCreditCard>): CreditCard
  
  /**
   * @param {MCreditCard["id"]} id id pelo qual a bank account será buscada
   * @throws {CreditCardNotFoundById}
   * @returns {CreditCard} Retorna objeto que representa a entidade CreditCard que contém o id informado
   */
  findById(id: MCreditCard["id"]): CreditCard

  /**
   * @param {MCreditCard["nickname"]} nickname descrição pela qual a bank account será procurada
   * @throws {CreditCardNotFoundByNickname}
   * @returns {CreditCard} Retorna objeto que representa a entidade CreditCard que contém a nickname informada
   */
  findByNickname(nickname: MCreditCard["nickname"]): CreditCard

  /**
   * @returns {CreditCard[]} retorna uma lista de CreditCards
   */
  findAll(): CreditCard[]

  /**
   * @param {MCreditCard["id"]} id id pela qual a CreditCard será buscada
   * @param {IRepositoryWithoutDatesUpdateProps<MCreditCard>} data valores que serão atualizado
   * @throws {CreditCardNotFoundById}
   * @returns {CreditCard} Retorna um objeto que representa a entidade CreditCard que contém a id informada
   */
  update(id: MCreditCard["id"], data: IRepositoryUpdateProps<MCreditCard>): CreditCard

  /**
   * @param {MCreditCard["id"]} id id da CreditCard a ser excluída
   * @returns {boolean} retorna true se conseguiu excluir e false caso contrário
   */
  delete(id: MCreditCard["id"]): boolean
}

export default class CreditCardDrizzleRepository implements IRepoCreditCard {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatInput(input: IRepositoryCreateProps<MCreditCard>): MCreditCardInput {
    return {
      ...input,
      closing_date: input.closing_date.toISOString().split('T')[0],
      due_date: input.due_date.toISOString().split('T')[0],
    }
  }  
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  private formatOutput(output: MCreditCardOutput): MCreditCard {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      closing_date: new Date(output.closing_date),
      due_date: new Date(output.due_date),
    }
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepositoryCreateProps<MCreditCard>): CreditCard {
    const forInsert = this.formatInput(data)
    const result = db.insert(credit_card).values(forInsert).returning().get()
    return new CreditCard(this.formatOutput(result))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MCreditCard["id"]): CreditCard {
    const result = db.query.credit_card.findFirst({where: eq(credit_card.id, id)}).sync()
    
    if (!result) throw new CreditCardNotFoundById(id)
    
    return new CreditCard(this.formatOutput(result))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findByNickname(nickname: MCreditCard["nickname"]): CreditCard {
    const result = db.query.credit_card.findFirst({where: eq(credit_card.nickname, nickname)}).sync()
    if (!result) throw new CreditCardNotFoundByNickname(nickname);
    return new CreditCard(this.formatOutput(result))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): CreditCard[] {
    const result = db.query.credit_card.findMany().sync()
    return result.map(this.formatOutput).map(cc => new CreditCard(cc))
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MCreditCard["id"], data: IRepositoryUpdateProps<MCreditCard>): CreditCard {
    const forUpdate = this.formatInput(data)
    const results = db.update(credit_card).set(forUpdate).where(eq(credit_card.id, id)).returning().get()
    if(!results) throw new CreditCardNotFoundById(id);
    return this.findById(id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MCreditCard["id"]): boolean {
    const result = db.delete(credit_card).where(eq(credit_card.id, id)).returning().get()
    return !result ? false : true
  }
}