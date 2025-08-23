import { initialDataBase, TransactionScreenBase } from ".";
import { recurringStrategies } from "../../../lib/strategies";
import { Kind, RecurringScreenInsert } from "../../../lib/types";

interface RecurringPaymentScreenProps {
  id?: string;
  kind: Kind
}

const initialDataRecurring = {
  ...initialDataBase,
  frequency: "MONTHLY"
} satisfies RecurringScreenInsert

export default function RecurringPaymentScreen({ id, kind }: RecurringPaymentScreenProps) {
  return (
    <TransactionScreenBase<RecurringScreenInsert>
      id={id}
      initialData={initialDataRecurring}
      fetchById={recurringStrategies[kind].fetchById}
      onInsert={recurringStrategies[kind].insert}
    />
  )
}
