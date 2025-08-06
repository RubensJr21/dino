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
  let last_installment_created: Installment | undefined = undefined;

  await db.transaction(async tx => {
    const repo = new InstallmentDrizzleRepository(tx);
    const repo_iv = new ItemValueDrizzleRepository(tx);
    const repo_tag = new TagDrizzleRepository(tx);
    const repo_tmt = new TransferMethodDrizzleRepository(tx);

     const tag_founded = repo_tag.find_by_description(params.tag_description);

    if (!tag_founded.success) {
      tx.rollback();
      return;
    }

    const transfer_method_founded = repo_tmt.find_by_id(params.transfer_method_id);

    if (!transfer_method_founded.success) {
      tx.rollback();
      return;
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
      tx.rollback();
      return;
    }

    last_installment_created = installment_created.data;
  })

  return last_installment_created;
}

export default register;