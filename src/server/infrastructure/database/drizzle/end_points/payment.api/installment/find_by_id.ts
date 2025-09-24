import FindInstallmentPaymentById from "@core/use_cases/payment/installment/find_by_id.use_case";
import { IInstallment } from "@domain/entities/installment.entity";
import { InstallmentScreenInsert } from "@lib/types";
import { db } from "@server/infrastructure/database/drizzle/client";
import InstallmentDrizzleRepository from "@server/infrastructure/database/drizzle/repositories/installment.repository";

interface Params {
  id: IInstallment["id"]
}

type Return = InstallmentScreenInsert | undefined

async function find_by_id({
  id
}: Params): Promise<Return> {
  let result: Return

  try {
    result = db.transaction<Return>((tx) => {
      const repo = new InstallmentDrizzleRepository(tx);

      const find_by_id = new FindInstallmentPaymentById(repo);

      const installment_founded = find_by_id.execute({ id })

      if (!installment_founded.success) {
        tx.rollback()
        return undefined;
      }

      const data = installment_founded.data

      return {
        description: data.description,
        amountValue: data.total_amount.toPrecision(2),
        tagSelected: data.tag.description,
        bankSelected: data.transfer_method.bank.nickname,
        transferMethodSelected: {
          id: data.transfer_method.id,
          label: data.transfer_method.method,
        },
        startDate: data.start_date,
        installments: data.installments_number.toString()
      }
    })
  } catch (error) {
    // TODO: Aqui eu popularia o erro
  }
  return result;
}

export default find_by_id;