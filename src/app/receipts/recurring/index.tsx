import { recurringStrategies } from "@lib/strategies";
import { RecurringEntity } from "@lib/types";
import RecurringHomeBase from "@pages/HomeScreenBase/Recurring";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function RecurringHome() {
  const [data, setData] = useState<RecurringEntity[]>([])
  const isFocused = useIsFocused()

  const route = useRouter()

  useEffect(() => {
    if (isFocused === false) return;
    recurringStrategies
      .receipt
      .list_all()
      .then(recurrings => setData(recurrings))
      .catch(error => {
        console.error(error)
        Alert.alert("Erro ao carregar transações!")
      })
  }, [isFocused])

  const goToRegister = () => {
    route.navigate('/receipts/recurring/register')
  }

  const goToEdit = (id: string) => {
    route.navigate({
      pathname: '/receipts/recurring/[id]/edit',
      params: { id }
    })
  }

  const goToDetails = (id: string) => {
    route.navigate({
      pathname: '/receipts/recurring/[id]',
      params: { id }
    })
  }

  return (
    <RecurringHomeBase
      kind="receipt"
      data={data}
      goToRegister={goToRegister}
      goToEdit={goToEdit}
      goToDetails={goToDetails}
    />
  )
}