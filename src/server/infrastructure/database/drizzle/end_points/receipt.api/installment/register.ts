import RegisterInstallmentReceipt from "@core/use_cases/receipt/installment/register.use_case";
import { IInstallment, Installment } from "@domain/entities/installment.entity";
import { ITag } from "@domain/entities/tag.entity";
import { ITransferMethod } from "@domain/entities/transfer_method.entity";
import { db } from "@server/infrastructure/database/drizzle/client";
import InstallmentDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/installment.repository";
import ItemValueDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/item_value.repository";
import TagDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/tag.repository";
import TransferMethodDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/transfer_method.repository";

interface Params {
  description: IInstallment["description"]
  transfer_method_id: ITransferMethod["id"];
  tag_description: ITag["description"];
  start_date: Date;
  current_amount: number;
  installments_number: number;
  total_amount: number;
}

type Return = Installment | undefined

async function register({
  ...params
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);
      const repo_iv = new ItemValueDrizzleRepository(tx);
      const repo_tag = new TagDrizzleRepository(tx);
      const repo_tmt = new TransferMethodDrizzleRepository(tx);

      const tag_founded = repo_tag.find_by_description(params.tag_description);

      if (!tag_founded.success) {
        tx.rollback();
        return undefined;
      }

      const transfer_method_founded = repo_tmt.find_by_id(params.transfer_method_id);

      if (!transfer_method_founded.success) {
        tx.rollback();
        return undefined;
      }

      const register_installment = new RegisterInstallmentReceipt(repo, repo_iv);

      const installment_created = register_installment.execute({
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
        return undefined;
      }
      return installment_created.data;
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default register;