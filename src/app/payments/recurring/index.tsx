import { recurringStrategies } from "@lib/strategies";
import { RecurringEntity } from "@lib/types";
import RecurringHomeBase from "@pages/HomeScreenBase/Recurring";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

// ALERT: Colocar aqui dados fictícios. Gerar com o chat GPT

export default function RecurringHome() {
  const [data, setData] = useState<RecurringEntity[]>([])
  const isFocused = useIsFocused()

  const route = useRouter()

  useEffect(() => {
    if (isFocused === false) return;
    // Lógica para recuperar os dados. Usar CallToast para alertar!
    recurringStrategies
      .payment
      .list_all()
      .then(recurrings => setData(recurrings))
      .catch(error => {
        console.error(error)
        Alert.alert("Erro ao carregar transações!")
      })
    setData([])
  }, [isFocused])

  const goToRegister = () => {
    route.navigate('/payments/recurring/register')
  }

  const goToEdit = (id: string) => {
    route.navigate({
      pathname: '/payments/recurring/[id]/edit',
      params: { id }
    })
  }
  return (
    <RecurringHomeBase
      kind="payment"
      data={data}
      goToRegister={goToRegister}
      goToEdit={goToEdit}
    />
  )
}