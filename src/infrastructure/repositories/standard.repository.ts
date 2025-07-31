import { ItemValue } from '@src/core/entities/item_value.entity'
import { MStandard } from '@src/core/models/standard.model'
import { CreateStandardParams, IRepoStandard, UpdateStandardParams } from "@src/core/shared/interfaces/IRepoStandard"
import { standard_mapper } from '@src/core/shared/mappers/standard'
import { db } from '@src/infrastructure/database/client'
import { item_value, standard } from '@src/infrastructure/database/schemas'
import { eq, inArray } from 'drizzle-orm/sql'
import { Transaction } from '../database/TransactionType'

export default class StandardDrizzleRepository implements IRepoStandard {
  constructor(private tx: Transaction) { }
  
  public create(data: CreateStandardParams): ReturnType<IRepoStandard["create"]> {
    const result = this.tx.insert(standard)
      .values({ fk_id_item_value: data.fk_id_item_value })
      .returning()
      .get()

    const standard_created = this.tx.query.standard.findFirst({
      with: {
        item_value: {
          with: {
            tag: true,
            transfer_method: true
          }
        }
      },
      where: eq(standard.id, result.id)
    }).sync()

    if (!standard_created) {
      return {
        success: false,
        error: {
          code: 'id_not_found',
          scope: "standard",
          message: "Um erro ocorreu durante a criação"
        }
      }
    }

    return {
      success: true,
      data: standard_mapper(standard_created)
    }
  }

  public find_by_id(id: MStandard["id"]): ReturnType<IRepoStandard["find_by_id"]> {
    const result = this.tx.query.standard.findFirst({
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

    if (!result) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "standard",
          message: `Foi retornado o valor ${result} na busca.`
        }
      }
    };

    return {
      success: true,
      data: standard_mapper(result)
    }
  }

  public find_all(): ReturnType<IRepoStandard["find_all"]> {
    const result = this.tx.query.standard.findMany({
      with: {
        item_value: {
          with: {
            tag: true,
            transfer_method: true
          }
        }
      }
    }).sync()

    const standards = result.map(standard_mapper)

    return {
      success: true,
      data: standards
    }
  }

  public find_all_by_cashflow_type(cashflow_type: ItemValue["cashflow_type"]): ReturnType<IRepoStandard["find_all_by_cashflow_type"]> {   
    // Segunda opção trocando a relação de one para many
    // const result2 = this.tx.query.standard.findMany({
    //   with: {
    //     item_value: {
    //       where: (item_value, {eq}) => eq(item_value.cashflow_type, cashflow_type),
    //       with: {
    //         tag: true,
    //         transfer_method: true
    //       }
    //     }
    //   }
    // }).sync()
    
    // https://www.answeroverflow.com/m/1190290538151284826
    const result = this.tx.query.standard.findMany({
      where: inArray(
        standard.fk_id_item_value,
        db
          .select({id: item_value.id})
          .from(item_value)
          .where(eq(item_value.cashflow_type, cashflow_type))
      ),
      with: {
        item_value: {
          with: {
            tag: true,
            transfer_method: true,
          },
        },
      },
    }).sync()

    const standards = result
    .map(standard_mapper)

    return {
      success: true,
      data: standards
    }
  }

  public update(id: MStandard["id"], data: UpdateStandardParams): ReturnType<IRepoStandard["update"]> {
    const result = this.tx.update(standard).set(data).where(eq(standard.id, id)).returning().get()

    const standard_updated = this.tx.query.standard.findFirst({ with: { item_value: {with: {tag: true, transfer_method: true}} }, where: eq(standard.id, result.id) }).sync()

    if (!standard_updated) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "standard",
          message: "Um erro aconteceu ao obter o item valor padrão atualizado."
        }
      }
    }

    return {
      success: true,
      data: standard_mapper(standard_updated)
    }
  }

  public delete(id: MStandard["id"]): ReturnType<IRepoStandard["delete"]> {
    // Usando o onDelete com modo cascade basta apagar o pai e todos os outros serão apagados
    const standard_deleted = this.tx.delete(standard).where(eq(standard.id, id)).get()

    if (!standard_deleted) {
      return {
        success: false,
        error: {
          code: "id_not_found",
          scope: "standard",
          message: "Ocorreu um erro ao deletar o item valor padrão."
        }
      }
    }

    return {
      success: true,
      data: true
    }
  }
}