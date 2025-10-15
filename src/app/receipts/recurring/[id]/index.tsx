import { find_recurring } from "@data/playground/recurring/find";
import { CallToast } from "@lib/call-toast";
import { mapperRecurring } from "@lib/strategies/recurring";
import { RecurringEntity } from "@lib/types";
import { RecurringViewerBase } from "@pages/DetailScreens/Recurring/Page";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

export default function RecurringDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const navigation = useNavigation()
  const [recurring, setRecurring] = useState<RecurringEntity>()

  useEffect(() => {
    const idAsNumber = Number(id)
    if (Number.isNaN(idAsNumber)) {
      CallToast("Valor de id inválido!")
      return navigation.goBack()
    }
    find_recurring(idAsNumber)
      .then((recurring => {
        if (recurring === undefined) {
          CallToast("Erro ao obter transação recorrente!")
          return;
        }
        setRecurring(mapperRecurring(recurring))
      }))
  }, [])

  if (id === undefined) {
    return <Redirect href={"/receipts/recurring"} />
  }

  if (recurring === undefined) {
    return null;
  }

  return (
    <RecurringViewerBase
      id={recurring.id}
      dataCard={recurring}
    />
  );
};