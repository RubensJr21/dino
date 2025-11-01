import InstallmentHomeBase from "@pages/HomeScreenBase/Installment";
import { useRouter } from "expo-router";

export default function InstallmentHome() {
  const route = useRouter()

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
      goToRegister={goToRegister}
      goToEdit={goToEdit}
      goToDetails={goToDetails}
    />
  )
}