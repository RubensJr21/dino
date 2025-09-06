import { standardStrategies } from "@lib/strategies";
import { Kind, StandardScreenInsert } from "@lib/types";
import { TransactionScreenBase, initialDataBase } from "../TransactionScreenBase";

import DatePicker from "@components/ui/SelectDateButton";
import { TransactionStandardCardRegister } from "@components/ui/TransactionCardRegister/TransactionStandardCardRegister";

interface StandardScreenProps {
  id?: string;
  kind: Kind
}

const initialDataStandard = {
  ...initialDataBase,
  scheduledAt: new Date()
} satisfies StandardScreenInsert

export default function StandardScreen({ id, kind }: StandardScreenProps) {
  return (
    <TransactionScreenBase<StandardScreenInsert>
      id={id}
      initialData={initialDataStandard}
      fetchById={standardStrategies[kind].fetchById}
      onSubmit={standardStrategies[kind].insert}
      CardElement={TransactionStandardCardRegister}
      renderExtras={(data, setData) => (
        <DatePicker
          label="Selecionar data"
          selectedLabel="Mudar data"
          date={data.scheduledAt}
          onDateConfirm={date => {
            setData(prev => ({
              ...prev,
              scheduledAt: date
            }))
          }}
        />
      )}
    />
  )
}
