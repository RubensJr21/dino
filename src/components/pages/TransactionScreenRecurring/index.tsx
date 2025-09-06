import DatePicker from "@components/ui/SelectDateButton";
import { SelectRecurrenceButton } from "@components/ui/SelectRecurrenceButton";
import { TransactionRecurringCardRegister } from "@components/ui/TransactionCardRegister/TransactionRecurringCardRegister";
import { recurringStrategies } from "@lib/strategies";
import { Kind, RecurringScreenInsert } from "@lib/types";
import { initialDataBase, TransactionScreenBase } from "@pages/TransactionScreenBase";

interface RecurringScreenProps {
  id?: string;
  kind: Kind
}

const initialDataRecurring = {
  ...initialDataBase,
  frequency: "",
  startDate: new Date()
} satisfies RecurringScreenInsert

export default function RecurringScreen({ id, kind }: RecurringScreenProps) {
  return (
    <TransactionScreenBase<RecurringScreenInsert>
      id={id}
      initialData={initialDataRecurring}
      fetchById={recurringStrategies[kind].fetchById}
      onSubmit={recurringStrategies[kind].insert}
      CardElement={TransactionRecurringCardRegister}
      renderExtras={(data, setData) => (
        <>
          <DatePicker
            label="Selecionar data de início"
            selectedLabel="Mudar data de início"
            date={data.startDate}
            onDateConfirm={date => {
              setData(prev => ({
                ...prev,
                startDate: date
              }))
            }}
          />
          <SelectRecurrenceButton
            recurrenceSelected={data.frequency}
            onSelected={(frequency) => {
              setData(prev => ({
                ...prev,
                frequency
              }))
            }}
          />
        </>
      )}
    />
  )
}
