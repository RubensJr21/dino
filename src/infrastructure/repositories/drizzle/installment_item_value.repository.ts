import { db } from '@infrastructure/database/drizzle/client'
import { installment_item_value } from '@infrastructure/database/drizzle/schemas'
import IRepository from '@src/core/shared/IRepository'
import { MInstallmentItemValue } from '@src/infrastructure/models/installment_item_value.model'
import { eq } from 'drizzle-orm/sql'

type MInstallmentItemValueWithoutAts = StrictOmit<MInstallmentItemValue, "created_at" | "updated_at">

type MInstallmentItemValueWithoutDate = StrictOmit<MInstallmentItemValueWithoutAts, "scheduled_at">

interface MInstallmentItemValueOutput extends MInstallmentItemValueWithoutDate {
  created_at: string;
  updated_at: string;
  scheduled_at: string;
}

export type IRepoInstallmentItemValue = IRepository<MInstallmentItemValue>

export default class InstallmentIItemValueDrizzleRepository implements IRepoInstallmentItemValue {   
  private formatOutput(output: MInstallmentItemValueOutput): MInstallmentItemValue {
    return {
      ...output,
      created_at: new Date(output.created_at),
      updated_at: new Date(output.updated_at),
      scheduled_at: new Date(output.scheduled_at)
    }
  }
  
  public async create(data: StrictOmit<MInstallmentItemValue, "id">): Promise<MInstallmentItemValue | undefined> {
    const forInsert = {
      base_item_value_id: data.biv_id,
      installments_number: data.installments_number
    }
    const results = await db.insert(installment_item_value).values(forInsert).returning()
    return this.findById(results[0].id)
  }

  public async findById(id: number): Promise<MInstallmentItemValue | undefined> {
    const result = await db.query.installment_item_value.findFirst({
      where: eq(installment_item_value.id, id),
      with: {
      base_item_value: true
      }
    })
    if(!result) return undefined;

    const {
      base_item_value: _,
      ...installment_item_value_searched
    } = {
      ...result,
      ...result.base_item_value,
      biv_id: result.base_item_value.id
    }

    return this.formatOutput(installment_item_value_searched)
  }

  public async findAll(): Promise<MInstallmentItemValue[]>{
    const result = await db.query.installment_item_value.findMany({
      with: {
        base_item_value: true
      }
    })
    return result.map((iiv) => {
      const {
      base_item_value: _,
      ...installment_item_value_searched
      } = {
      ...iiv,
      ...iiv.base_item_value,
      biv_id: iiv.base_item_value.id
      }
      return this.formatOutput(installment_item_value_searched)
    }) 
  }

  public async update(id: number, data: StrictOmit<MInstallmentItemValue, "id">): Promise<MInstallmentItemValue | undefined> {
    const forUpdate = {
      base_item_value_id: data.biv_id,
      installments_number: data.installments_number
    }
    const results = await db.update(installment_item_value).set(forUpdate).where(eq(installment_item_value.id, id))

    if(!results) return undefined;

    return this.findById(id)
  }

  public async delete(id: number){
    await db.delete(installment_item_value).where(eq(installment_item_value.id, id))
    return true
  }
}