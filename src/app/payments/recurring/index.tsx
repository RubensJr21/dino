import RecurringHomeBase from "@components/pages/HomeScreenBase/RecurringHomeBase";
import { Recurring } from "@domain/entities/recurring.entity";
import { useIsFocused } from "@react-navigation/native";
import { list_of_recurrings } from "@utils/factories/recurring.factory";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

// ALERT: Colocar aqui dados fictícios. Gerar com o chat GPT

export default function RecurringHome() {
  const [data, setData] = useState<Recurring[]>([])
  const isFocused = useIsFocused()

  const route = useRouter()

  useEffect(() => {
    if (isFocused === false) return;
    // Lógica para recuperar os dados. Usar CallToast para alertar!
    setData(list_of_recurrings)
  }, [isFocused])

  const goToRegister = () => {
    route.navigate('/payments/recurring/register')
  }

  const goToEdit = () => {
    route.navigate({
      pathname: '/payments/recurring/[id]/edit',
      params: { id: '123' }
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