import StandardHomeBase from "@components/pages/HomeScreenBase/StandardHomeBase";
import { StandardEntity } from "@lib/types";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

// ALERT: Colocar aqui dados fictícios. Gerar com o chat GPT

export default function StandardHome() {
  const [data, setData] = useState<StandardEntity[]>([])
  const isFocused = useIsFocused()

  const route = useRouter()

  useEffect(() => {
    if (isFocused === false) return;
    // Lógica para recuperar os dados. Usar CallToast para alertar!
    setData([])
  }, [isFocused])

  const goToRegister = () => {
    route.navigate('/payments/standard/register')
  }

  const goToEdit = () => {
    route.navigate({
      pathname: '/payments/standard/[id]/edit',
      params: { id: '123' }
    })
  }

  return (
    <StandardHomeBase
      kind="payment"
      data={data}
      goToRegister={goToRegister}
      goToEdit={goToEdit}
    />
  )
}