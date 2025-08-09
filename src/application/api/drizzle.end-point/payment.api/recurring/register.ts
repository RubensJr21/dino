import { IItemValue } from "@src/core/entities/item_value.entity";
import { IRecurrenceType } from "@src/core/entities/recurrence_type.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { ITag } from "@src/core/entities/tag.entity";
import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import RegisterRecurringPayment from "@src/core/use_cases/payment/recurring/register.use_case";
import { db } from "@src/infrastructure/database/client";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import RecurrenceTypeDrizzleRepository from "@src/infrastructure/repositories/recurrence_type.repository";
import RecurringDrizzleRepository from "@src/infrastructure/repositories/recurring.repository";
import TagDrizzleRepository from "@src/infrastructure/repositories/tag.repository";
import TransferMethodDrizzleRepository from "@src/infrastructure/repositories/transfer_method.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  description: IItemValue["description"];
  is_disabled: boolean;
  start_date: Date;
  end_date?: Date;
  current_amount: number;
  tag_description: ITag["description"];
  transfer_method_id: ITransferMethod["id"];
  recurrence_type: IRecurrenceType["type"];
}

// ALERT: Criar 'EndPointResult' 

async function register({
  ...params
}: Params): Promise<Recurring | undefined> {
  db.run(sql.raw("BEGIN"))
  
  const repo = new RecurringDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();
  const repo_tag = new TagDrizzleRepository();
  const repo_rt = new RecurrenceTypeDrizzleRepository();
  const repo_tmt = new TransferMethodDrizzleRepository();

  const tag_founded = repo_tag.find_by_description(params.tag_description);

  if (!tag_founded.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  const recurrence_type_founded = repo_rt.find_by_type(params.recurrence_type);

  if (!recurrence_type_founded.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  const transfer_method_type_founded = repo_tmt.find_by_id(params.transfer_method_id);

  if (!transfer_method_type_founded.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  const register_recurring = new RegisterRecurringPayment(repo, repo_iv);

  const recurring_created = await register_recurring.execute({
    // ATTENTION: Preciso obter o description
    description: "",
    is_disabled: params.is_disabled,
    start_date: params.start_date,
    end_date: params.end_date,
    current_amount: params.current_amount,
    tag: tag_founded.data,
    transfer_method: transfer_method_type_founded.data,
    recurrence_type: recurrence_type_founded.data,
  })

  if (!recurring_created.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return recurring_created.data;
}

export default register;