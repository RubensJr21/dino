import StandardHomeBase from "@components/pages/HomeScreenBase/StandardHomeBase";
import { Standard } from "@domain/entities/standard.entity";
import { useIsFocused } from "@react-navigation/native";
import { list_of_standards } from "@utils/factories/standard.factory";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

// ALERT: Colocar aqui dados fictícios. Gerar com o chat GPT

export default function StandardHome() {
  const [data, setData] = useState<Standard[]>([])
  const isFocused = useIsFocused()

  const route = useRouter()

  useEffect(() => {
    if (isFocused === false) return;
    // Lógica para recuperar os dados. Usar CallToast para alertar!
    setData(list_of_standards)
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