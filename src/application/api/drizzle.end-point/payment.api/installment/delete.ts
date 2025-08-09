import { IInstallment } from "@src/core/entities/installment.entity";
import DeleteInstallmentPayment from "@src/core/use_cases/payment/installment/delete.use_case";
import { db } from "@src/infrastructure/database/client";
import InstallmentDrizzleRepository from "@src/infrastructure/repositories/installment.repository";
import { sql } from "drizzle-orm/sql";

interface Params {
  id: IInstallment["id"]
}

async function delete_installment({
  id
}: Params): Promise<boolean | undefined> {
  db.run(sql.raw("BEGIN"))
    
    const repo = new InstallmentDrizzleRepository();
    const delete_installment = new DeleteInstallmentPayment(repo);

    const installment_deleted = await delete_installment.execute({id})

    if(!installment_deleted.success){
      db.run(sql.raw("ROLLBACK"));
      return undefined;
    }

    db.run(sql.raw("COMMIT"))
    return true
}

export default delete_installment;