import StandardHomeBase from "@components/pages/HomeScreenBase/StandardHomeBase";
import { standardStrategies } from "@lib/strategies";
import { StandardEntity } from "@lib/types";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

// ALERT: Colocar aqui dados fictícios. Gerar com o chat GPT

export default function StandardHome() {
  const [data, setData] = useState<StandardEntity[]>([])
  const { reload = "false" } = useLocalSearchParams<{ reload?: string }>()
  const isFocused = useIsFocused()
  const route = useRouter()

  useEffect(() => {
    if (isFocused === false) return;
    // Lógica para recuperar os dados. Usar CallToast para alertar!
    standardStrategies
      .payment
      .list_all()
      .then(standards => setData(standards))
      .catch(error => {
        console.error(error)
        Alert.alert("Erro ao carregar transações!")
      })
  }, [isFocused])

  useEffect(() => {
    console.log("Chamando useEffect(reload)")
    if (reload !== undefined) {
      console.log("Vou atualizar a lista...")
      standardStrategies
        .payment
        .list_all()
        .then(standards => {
          console.log(standards)
          setData(standards)
        })
        .catch(error => {
          console.error(error)
          Alert.alert("Erro ao carregar transações!")
        })
    }
  }, [reload])

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