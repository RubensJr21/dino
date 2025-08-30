import { TransferMethod } from "@domain/entities/transfer_method.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import TransferMethodDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/transfer_method.repository";

type Return = TransferMethod[] | undefined

async function list_all(): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new TransferMethodDrizzleRepository(tx);
      const result = repo.find_all()

      if(!result.success){
        tx.rollback()
        return undefined;
      }

      return result.data
    })
  } catch (error) {
    
  }
  return result
}

export default list_all;