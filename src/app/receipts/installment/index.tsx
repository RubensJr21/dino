import { installmentStrategies } from "@lib/strategies";
import { InstallmentEntity } from "@lib/types";
import InstallmentHomeBase from "@pages/HomeScreenBase/Installment";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function InstallmentHome() {
  const [data, setData] = useState<InstallmentEntity[]>([])
  const isFocused = useIsFocused()

  const route = useRouter()

  useEffect(() => {
    if (isFocused === false) return;
    installmentStrategies
      .receipt
      .list_all()
      .then(recurrings => setData(recurrings))
      .catch(error => {
        console.error(error)
        Alert.alert("Erro ao carregar transações!")
      })
  }, [isFocused])

  const goToRegister = () => {
    route.navigate('/receipts/installment/register')
  }

  const goToEdit = (id: string) => {
    route.navigate({
      pathname: '/receipts/installment/[id]/edit',
      params: { id }
    })
  }

  const goToDetails = (id: string) => {
    route.navigate({
      pathname: '/receipts/installment/[id]',
      params: { id }
    })
  }

  return (
    <InstallmentHomeBase
      kind="receipt"
      data={data}
      goToRegister={goToRegister}
      goToEdit={goToEdit}
      goToDetails={goToDetails}
    />
  )
}