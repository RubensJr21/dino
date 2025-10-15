import { standardStrategies } from "@lib/strategies";
import { StandardEntity } from "@lib/types";
import StandardHomeBase from "@pages/HomeScreenBase/Standard";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export default function StandardHome() {
  const [data, setData] = useState<StandardEntity[]>([])
  const { reload = "false" } = useLocalSearchParams<{ reload?: string }>()
  const isFocused = useIsFocused()
  const route = useRouter()

  const loadData = useCallback(() => {
    standardStrategies
      .receipt
      .list_all()
      .then(standards => setData(standards))
      .catch(error => {
        console.error(error)
        Alert.alert("Erro ao carregar transações!")
      })
  }, [])

  useEffect(() => {
    if (isFocused === false) return;
    loadData()
  }, [isFocused])

  useEffect(() => {
    if (reload === "true") {
      loadData()
    }
  }, [reload])

  const goToRegister = useCallback(() => {
    route.navigate('/receipts/standard/register')
  }, [route])

  const goToEdit = useCallback((id: string) => {
    route.navigate({
      pathname: '/receipts/standard/[id]/edit',
      params: { id }
    })
  }, [route])

  return (
    <StandardHomeBase
      kind="receipt"
      data={data}
      goToRegister={goToRegister}
      goToEdit={goToEdit}
    />
  )
}