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
    // Lógica para recuperar os dados. Usar CallToast para alertar!
    installmentStrategies
      .payment
      .list_all()
      .then(recurrings => setData(recurrings))
      .catch(error => {
        console.error(error)
        Alert.alert("Erro ao carregar transações!")
      })
  }, [isFocused])

  const goToRegister = () => {
    route.navigate('/payments/installment/register')
  }

  const goToEdit = (id: string) => {
    route.navigate({
      pathname: '/payments/installment/[id]/edit',
      params: { id }
    })
  }

  const goToDetails = (id: string) => {
    route.navigate({
      pathname: '/payments/installment/[id]',
      params: { id }
    })
  }

  return (
    <InstallmentHomeBase
      kind="payment"
      data={data}
      goToRegister={goToRegister}
      goToEdit={goToEdit}
      goToDetails={goToDetails}
    />
  )
}