import RegisterRecurringReceipt from "@core/use_cases/receipt/recurring/register.use_case";
import { IRecurrenceType } from "@domain/entities/recurrence_type.entity";
import { IRecurring, Recurring } from "@domain/entities/recurring.entity";
import { ITag } from "@domain/entities/tag.entity";
import { ITransferMethod } from "@domain/entities/transfer_method.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import ItemValueDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/item_value.repository";
import RecurrenceTypeDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/recurrence_type.repository";
import RecurringDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/recurring.repository";
import TagDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/tag.repository";
import TransferMethodDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/transfer_method.repository";

interface Params {
  description: IRecurring["description"];
  is_disabled: boolean;
  start_date: Date;
  end_date?: Date;
  current_amount: number;
  tag_description: ITag["description"];
  transfer_method_id: ITransferMethod["id"];
  recurrence_type: IRecurrenceType["type"];
}

// ALERT: Criar 'EndPointResult' 

type Return = Recurring | undefined

async function register({
  ...params
}: Params): Promise<Recurring | undefined> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new RecurringDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);
      const repo_tag = new TagDrizzleRepository(tx);
      const repo_rt = new RecurrenceTypeDrizzleRepository(tx);
      const repo_tmt = new TransferMethodDrizzleRepository(tx);

      const tag_founded = repo_tag.find_by_description(params.tag_description);

      if (!tag_founded.success) {
        tx.rollback();
        return undefined;
      }

      const recurrence_type_founded = repo_rt.find_by_type(params.recurrence_type);

      if (!recurrence_type_founded.success) {
        tx.rollback();
        return undefined;
      }

      const transfer_method_type_founded = repo_tmt.find_by_id(params.transfer_method_id);

      if (!transfer_method_type_founded.success) {
        tx.rollback();
        return undefined;
      }

      const register_recurring = new RegisterRecurringReceipt(repo, repo_iv);

      const recurring_created = register_recurring.execute({
        description: params.description,
        is_disabled: params.is_disabled,
        start_date: params.start_date,
        end_date: params.end_date,
        current_amount: params.current_amount,
        tag: tag_founded.data,
        transfer_method: transfer_method_type_founded.data,
        recurrence_type: recurrence_type_founded.data,
      })

      if (!recurring_created.success) {
        tx.rollback();
        return undefined;
      }

      return recurring_created.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;


}

export default register;