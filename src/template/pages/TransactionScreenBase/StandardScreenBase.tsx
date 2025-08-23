import { TransactionScreenBase, initialDataBase } from ".";
import { standardStrategies } from "../../../lib/strategies";
import { Kind, StandardScreenInsert } from "../../../lib/types";

interface StandardPaymentScreenProps {
  id?: string;
  kind: Kind
}

export default function StandardPaymentScreen({ id, kind }: StandardPaymentScreenProps) {
  return (
    <TransactionScreenBase<StandardScreenInsert>
      id={id}
      initialData={initialDataBase}
      fetchById={standardStrategies[kind].fetchById}
      onInsert={standardStrategies[kind].insert}
    />
  )
}
