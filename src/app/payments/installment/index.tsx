import InstallmentHomeBase from "@src/template/pages/HomeScreenBase/InstallmentHomeBase";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function InstallmentHome() {
  const route = useRouter()
  
  const goToRegister = () => {
    route.navigate('/payments/installment/register')
  }

  const goToEdit = () => {
    route.navigate({
      pathname: '/payments/installment/[id]/edit',
      params: { id: '123' }
    })
  }

  return (
    <InstallmentHomeBase kind="payment" />
  )

  return (
    <>
      <Text>Installment Home</Text>
      <Button onPress={goToRegister} title="Go to Register" />
      <Button onPress={goToEdit} title="Go to Edit" />
    </>
  )
}