import { Installment } from "@src/core/entities/installment.entity";
import { IItemValue } from "@src/core/entities/item_value.entity";
import { ITag } from "@src/core/entities/tag.entity";
import { ITransferMethod } from "@src/core/entities/transfer_method.entity";
import RegisterInstallmentPayment from "@src/core/use_cases/payment/installment/register.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import ItemValueDrizzleRepository from "@src/infrastructure/repositories/item_value.repository";
import TagDrizzleRepository from "@src/infrastructure/repositories/tag.repository";
import TransferMethodDrizzleRepository from "@src/infrastructure/repositories/transfer_method.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  description: IItemValue["description"]
  transfer_method_id: ITransferMethod["id"];
  tag_description: ITag["description"];
  start_date: Date;
  current_amount: number;
  installments_number: number;
  total_amount: number;
}

async function register({
  ...params
}: Params): Promise<Installment | undefined> {
  db.run(sql.raw("BEGIN"))
  const repo = new InstallmentDrizzleRepository();
  const repo_iv = new ItemValueDrizzleRepository();
  const repo_tag = new TagDrizzleRepository();
  const repo_tmt = new TransferMethodDrizzleRepository();

  const tag_founded = repo_tag.find_by_description(params.tag_description);

  if (!tag_founded.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  const transfer_method_founded = repo_tmt.find_by_id(params.transfer_method_id);

  if (!transfer_method_founded.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  const register_installment = new RegisterInstallmentPayment(repo, repo_iv);

  const installment_created = await register_installment.execute({
    description: params.description,
    transfer_method: transfer_method_founded.data,
    tag: tag_founded.data,
    start_date: params.start_date,
    current_amount: params.current_amount,
    installments_number: params.installments_number,
    total_amount: params.total_amount,
  })

  if (!installment_created.success) {
    db.run(sql.raw("ROLLBACK"));
    return undefined;
  }

  db.run(sql.raw("COMMIT"))
  return installment_created.data;
}

export default register;