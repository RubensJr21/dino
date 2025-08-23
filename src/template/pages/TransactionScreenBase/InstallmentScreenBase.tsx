import { initialDataBase, TransactionScreenBase } from ".";
import { installmentStrategies } from "../../../lib/strategies";
import { InstallmentScreenInsert, Kind } from "../../../lib/types";

interface InstallmentPaymentScreenProps {
  id?: string;
  kind: Kind
}

const initialDataInstallment = {
  ...initialDataBase,
  installments: 1,
} satisfies InstallmentScreenInsert;

export default function InstallmentPaymentScreen({ id, kind }: InstallmentPaymentScreenProps) {
  return (
    <TransactionScreenBase<InstallmentScreenInsert>
      id={id}
      initialData={initialDataInstallment}
      fetchById={installmentStrategies[kind].fetchById}
      onInsert={installmentStrategies[kind].insert}
    />
  )
}
