import { Tag } from "@src/core/entities/tag.entity";
import { db } from "@src/infrastructure/database/client";
import TagDrizzleRepository from "@src/infrastructure/repositories/tag.repository";

type Return = Tag[] | undefined

async function list_all(): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new TagDrizzleRepository(tx);
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