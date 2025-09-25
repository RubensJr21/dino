import DatePicker from "@components/ui/SelectDateButton";
import { INITIAL_RECURRENCE_TYPE, SelectRecurrenceButton } from "@components/ui/SelectRecurrenceButton";
import { TransactionRecurringCardRegister } from "@components/ui/TransactionCardRegister/TransactionRecurringCardRegister";
import { recurringStrategies } from "@lib/strategies";
import { Kind, RecurringScreenInsert } from "@lib/types";
import { initialDataBase, TransactionScreenBase } from "@pages/TransactionScreenBase";
import { useEffect, useState } from "react";

interface TransactionRecurringScreenProps {
  id?: string;
  kind: Kind
}

const initialDataRecurring = {
  ...initialDataBase,
  recurrenceType: INITIAL_RECURRENCE_TYPE,
  startDate: new Date(),
  endDate: null
} satisfies RecurringScreenInsert

export function TransactionRecurringScreen({ id, kind }: TransactionRecurringScreenProps) {
  const [initialData, setInitialData] = useState<RecurringScreenInsert>()
  const isEdit = id !== undefined

  useEffect(() => {
    if (id) {
      recurringStrategies[kind].fetchById(id).then((fetchData) => {
        if (fetchData !== undefined) {
          setInitialData(fetchData)
        }
      })
    } else {
      setInitialData(initialDataRecurring)
    }
  }, [id])

  if (initialData === undefined) {
    // Quer dizer que o conteúdo ainda não foi inicializado ou carregado
    return null;
  }

  return (
    <TransactionScreenBase<RecurringScreenInsert>
      initialData={initialData}
      onSubmit={recurringStrategies[kind].insert}
      CardElement={TransactionRecurringCardRegister}
      renderExtras={(data, setData) => (
        (
          !isEdit &&
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
              recurrenceSelected={data.recurrenceType}
              onSelected={(frequency) => {
                setData(prev => ({
                  ...prev,
                  frequency
                }))
              }}
            />
          </>
        )
      )}
    />
  )
}
