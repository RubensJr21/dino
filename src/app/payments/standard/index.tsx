import StandardHomeBase from "@pages/HomeScreenBase/Standard";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function StandardHome() {
  const route = useRouter()

  const goToRegister = useCallback(() => {
    route.navigate('/payments/standard/register')
  }, [route])

  const goToEdit = useCallback((id: string) => {
    route.navigate({
      pathname: '/payments/standard/[id]/edit',
      params: { id }
    })
  }, [route])

  return (
    <StandardHomeBase
      kind="payment"
      goToRegister={goToRegister}
      goToEdit={goToEdit}
    />
  )
}