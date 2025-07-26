import { Standard } from "@src/core/entities/standard.entity";
import IEntityBase from "@src/core/shared/interfaces/IEntityBase";
import FindPaymentStandardById from "@src/core/use_cases/payment/standard/find_by_id.use_case";
import { db } from "@src/infrastructure/database/client";
import StandardDrizzleRepository from "@src/infrastructure/repositories/standard.repository";

interface Params {
  id: IEntityBase["id"]
}

async function find_by_id({
  id
}: Params): Promise<Standard | undefined>{
  let last_standard_founded: Standard | undefined = undefined;

  await db.transaction(async tx => {
    const repo = new StandardDrizzleRepository(tx);
    const find_by_id = new FindPaymentStandardById(repo);
    const standard_founded = await find_by_id.execute({id})
    if(!standard_founded.success){
      tx.rollback()
      return;
    }
    last_standard_founded = standard_founded.data
  })

  return last_standard_founded;
}

export default find_by_id;