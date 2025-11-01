import StandardHomeBase from "@pages/HomeScreenBase/Standard";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function StandardHome() {
  const route = useRouter()

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
      goToRegister={goToRegister}
      goToEdit={goToEdit}
    />
  )
}