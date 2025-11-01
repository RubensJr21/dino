import RecurringHomeBase from "@pages/HomeScreenBase/Recurring";
import { useRouter } from "expo-router";

export default function RecurringHome() {
  const route = useRouter()

  const goToRegister = () => {
    route.navigate('/payments/recurring/register')
  }

  const goToEdit = (id: string) => {
    route.navigate({
      pathname: '/payments/recurring/[id]/edit',
      params: { id }
    })
  }

  const goToDetails = (id: string) => {
    route.navigate({
      pathname: '/payments/recurring/[id]',
      params: { id }
    })
  }

  return (
    <RecurringHomeBase
      kind="payment"
      goToRegister={goToRegister}
      goToEdit={goToEdit}
      goToDetails={goToDetails}
    />
  )
}