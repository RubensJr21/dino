import { standardStrategies } from "@lib/strategies";
import { Kind, StandardScreenInsert } from "@lib/types";
import { TransactionScreenBase, initialDataBase } from "../TransactionScreenBase";

import DatePicker from "@components/ui/SelectDateButton";
import { TransactionStandardCardRegister } from "@components/ui/TransactionCardRegister/TransactionStandardCardRegister";
import { useEffect, useState } from "react";

interface TransactionStandardScreenProps {
  id?: string;
  kind: Kind
}

const initialDataStandard = {
  ...initialDataBase,
  scheduledAt: new Date()
} satisfies StandardScreenInsert

export function TransactionStandardScreen({ id, kind }: TransactionStandardScreenProps) {
  const [initialData, setInitialData] = useState<StandardScreenInsert>()

  useEffect(() => {
    if (id) {
      standardStrategies[kind].fetchById(id).then((fetchData) => {
        if (fetchData !== undefined) {
          setInitialData(fetchData)
        }
      })
    } else {
      setInitialData(initialDataStandard)
    }
  }, [id])

  if (initialData === undefined) {
    // Quer dizer que o conteúdo ainda não foi inicializado ou carregado
    return null;
  }
  
  return (
    <TransactionScreenBase<StandardScreenInsert>
      initialData={initialData}
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
