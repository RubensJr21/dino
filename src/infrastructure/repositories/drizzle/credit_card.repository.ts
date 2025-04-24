import IRepository from "@src/core/shared/IRepository";
import { db } from "@src/infrastructure/database/drizzle/client";
import { credit_card } from "@src/infrastructure/database/drizzle/schemas";
import { MCreditCard } from "@src/infrastructure/models/credit_card.model";
import { eq } from "drizzle-orm/sql";

type MCreditCardWithoutAts = StrictOmit<MCreditCard, "created_at" | "updated_at">

type MCreditCardWithoutDate = StrictOmit<MCreditCardWithoutAts, "closing_date" | "due_date">

interface MCreditCardInput extends MCreditCardWithoutDate {
  closing_date: string;
  due_date: string;
}

interface MCreditCardOutput extends MCreditCardWithoutDate {
  created_at: string;
  updated_at: string;
  closing_date: string;
  due_date: string;
}

export interface IRepoCreditCard extends IRepository<MCreditCard> {
  findByNickname(nickname: string): Promise<MCreditCard | undefined>
}

export default class CreditCardDrizzleRepository implements IRepoCreditCard {
  private formatInput(input: StrictOmit<MCreditCardWithoutAts, "id">): StrictOmit<MCreditCardInput, "id">{
    return {
      ...input,
      closing_date: input.closing_date.toISOString().split('T')[0],
      due_date: input.due_date.toISOString().split('T')[0],
    }
  }  
  
  private formatOutput(output: MCreditCardOutput): MCreditCard {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      closing_date: new Date(output.closing_date),
      due_date: new Date(output.due_date),
    }
  }

  async create(data: StrictOmit<MCreditCardWithoutAts, "id">): Promise<MCreditCard | undefined> {
    const forInsert = this.formatInput(data)
    const results = await db.insert(credit_card).values(forInsert).returning()
    if(!results) return;
    return this.formatOutput(results[0])
  }

  async findById(id: number): Promise<MCreditCard | undefined> {
    const result = await db.query.credit_card.findFirst({where: eq(credit_card.id, id)})
    
    if (!result) return;
    
    return this.formatOutput(result)
  }

  async findByNickname(nickname: string): Promise<MCreditCard | undefined> {
    const result = await db.query.credit_card.findFirst({where: eq(credit_card.nickname, nickname)})
    if (!result) return;
    return this.formatOutput(result)
  }

  async findAll(): Promise<MCreditCard[]> {
    const result = await db.query.credit_card.findMany()
    return result.map(this.formatOutput)
  }
  
  async update(id: number, data: StrictOmit<MCreditCardWithoutAts, "id">): Promise<MCreditCard | undefined> {
    const forUpdate = this.formatInput(data)
    const results = await db.update(credit_card).set(forUpdate).where(eq(credit_card.id, id)).returning()
    if(!results) return;
    return this.findById(id)
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.delete(credit_card).where(eq(credit_card.id, id)).returning()
    if(!result) return false;
    return true
  }
}