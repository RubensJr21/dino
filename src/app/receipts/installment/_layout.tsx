import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Recebimentos parcelados",
  "register": "Registrar pagamento parcelado",
  "[id]/index": "Detalhes do pagamento parcelado",
  "[id]/edit": "Editar pagamento parcelado"
}

export default function InstallmentLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    // ESSE TYPE CASTING FOI CONSCIENTE
    const title = headerTitles[routeName as keyof typeof headerTitles] || "Recebimentos Parcelados"
    navigation.setOptions({
      headerTitle: title
    })
  }, [navigation])

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      screenListeners={() => ({
        focus: ({ target, ...rest }) => {
          if (target === undefined) return;
          changeHeaderTitleOfFather(target.split("-")[0])
        }
      })}
    />
  )
}