import { RecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { db } from "@src/infrastructure/database/client";
import RecurrenceTypeDrizzleRepository from "@src/infrastructure/repositories/recurrence_type.repository";

type Return = RecurrenceType[] | undefined

async function list_all(): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new RecurrenceTypeDrizzleRepository(tx);
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