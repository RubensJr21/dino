import InstallmentHomeBase from "@components/pages/HomeScreenBase/InstallmentHomeBase";
import { Installment } from "@domain/entities/installment.entity";
import { useIsFocused } from "@react-navigation/native";
import { list_of_installments } from "@utils/factories/installments.factory";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

// ALERT: Colocar aqui dados fictícios. Gerar com o chat GPT

export default function InstallmentHome() {
  const [data, setData] = useState<Installment[]>([])
  const isFocused = useIsFocused()

  const route = useRouter()

  useEffect(() => {
    if (isFocused === false) return;
    // Lógica para recuperar os dados. Usar CallToast para alertar!
    setData(list_of_installments)
  }, [isFocused])

  const goToRegister = () => {
    route.navigate('/payments/installment/register')
  }

  const goToEdit = () => {
    route.navigate({
      pathname: '/payments/installment/[id]/edit',
      params: { id: '123' }
    })
  }

  const goToDetails = () => {
    route.navigate({
      pathname: '/payments/installment/[id]',
      params: { id: '123' }
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