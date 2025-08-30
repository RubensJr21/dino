import Dropdown from "@components/ui/Dropdown";
import { recurringStrategies } from "@lib/strategies";
import { Kind, RecurringScreenInsert } from "@lib/types";
import { initialDataBase, TransactionScreenBase } from ".";

interface RecurringScreenProps {
  id?: string;
  kind: Kind
}

const initialDataRecurring = {
  ...initialDataBase,
  frequency: "MONTHLY"
} satisfies RecurringScreenInsert

export default function RecurringScreen({ id, kind }: RecurringScreenProps) {
  return (
    <TransactionScreenBase<RecurringScreenInsert>
      id={id}
      initialData={initialDataRecurring}
      fetchById={recurringStrategies[kind].fetchById}
      onInsert={recurringStrategies[kind].insert}
      renderExtras={(p, pr) => (
        <Dropdown>Dropdown de selecionar recorrência</Dropdown>
      )}
    />
  )
}
