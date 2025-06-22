import { ItemValue } from '@src/core/entities/item_value.entity'
import { Standard } from '@src/core/entities/standard.entity'
import { Tag } from '@src/core/entities/tag.entity'
import { TransferMethod } from '@src/core/entities/transfer_method.entity'
import { MStandard } from '@src/core/models/standard.model'
import { StandardNotFoundById } from '@src/core/shared/errors/standard'
import { IRepoStandard, IRepoStandardCreateProps, IRepoStandardUpdateProps } from "@src/core/shared/interfaces/IRepositoryStandard"
import { db } from '@src/infrastructure/database/client'
import { item_value, standard } from '@src/infrastructure/database/schemas'
import { eq } from 'drizzle-orm/sql'

export default class StandardDrizzleRepository implements IRepoStandard {
  // eslint-disable-next-line jsdoc/require-jsdoc
  public create(data: IRepoStandardCreateProps): Standard {
    const item_value_result = db.insert(item_value).values({
      id: data.item_value.id,
      description: data.item_value.description,
      cashflow_type: data.item_value.cashflow_type,
      scheduled_at: data.item_value.scheduled_at,
      amount: data.item_value.amount,
      was_processed: data.item_value.was_processed,
      fk_id_transfer_method: data.item_value.fk_id_transfer_method,
      fk_id_tag: data.item_value.fk_id_tag
    }).returning().get()

		const result = db.insert(standard)
                      .values({fk_id_item_value: item_value_result.id})
                      .returning({ id: standard.id })
                      .get()
    return this.findById(result.id)
  }
  
  // eslint-disable-next-line jsdoc/require-jsdoc
  public findById(id: MStandard["id"]): Standard {
		const result = db.query.standard.findFirst({
			where: eq(standard.id, id),
			with: {
        item_value: {
          with: {
            tag: true,
            transfer_method: true
          }
        }
      }
    }).sync()
		if(!result) throw new StandardNotFoundById(id);

    return new Standard({
      id: result.id,
      item_value: new ItemValue({
        id: result.item_value.id,
        description: result.item_value.description,
        cashflow_type: result.item_value.cashflow_type,
        scheduled_at: new Date(result.item_value.scheduled_at),
        amount: result.item_value.amount,
        was_processed: result.item_value.was_processed,
        transfer_method: new TransferMethod(result.item_value.transfer_method),
        tag: new Tag(result.item_value.tag),
        created_at: new Date(result.item_value.created_at),
        updated_at: new Date(result.item_value.updated_at)
      }),
      created_at: new Date(result.created_at),
      updated_at: new Date(result.updated_at)
    })
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAll(): Standard[]{
    const result = db.query.standard.findMany({
      columns: { id: true }
    }).sync()
    return result.map((iv) => this.findById(iv.id)) 
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public findAllByCashflowType(cashflow_type: ItemValue["cashflow_type"]): Standard[]{
    const result = db.select({
      id: standard.id,
    })
    .from(standard)
    .innerJoin(item_value, eq(item_value.id, standard.fk_id_item_value))
    .where(eq(item_value.cashflow_type, cashflow_type))
    .all()
    if(!result) return [];
    return result.map(({ id }) => this.findById(id))
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public update(id: MStandard["id"], data: IRepoStandardUpdateProps): Standard {
    const forUpdate = {
      fk_id_item_value: data.item_value.id
    }
    const results = db.update(standard).set(forUpdate).where(eq(standard.id, id)).returning().get()
    return this.findById(results.id)
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public delete(id: MStandard["id"]): boolean {
    const result = db.delete(standard).where(eq(standard.id, id)).get()
    return !result ? false: true;
  }
}