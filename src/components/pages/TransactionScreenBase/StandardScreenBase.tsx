import { TransactionScreenBase, initialDataBase } from ".";
import { standardStrategies } from "../../../lib/strategies";
import { Kind, StandardScreenInsert } from "../../../lib/types";

interface StandardScreenProps {
  id?: string;
  kind: Kind
}

export default function StandardScreen({ id, kind }: StandardScreenProps) {
  return (
    <TransactionScreenBase<StandardScreenInsert>
      id={id}
      initialData={initialDataBase}
      fetchById={standardStrategies[kind].fetchById}
      onInsert={standardStrategies[kind].insert}
    />
  )
}
