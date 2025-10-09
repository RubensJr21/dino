import { Stack } from "expo-router";

export default function BankLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Bancos"
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          title: "Registrar conta bancária"
        }}
      />

      <Stack.Screen
        name="[id]/edit"
        options={{
          title: "Editar conta bancária"
        }}
      />
    </Stack>
  )
}