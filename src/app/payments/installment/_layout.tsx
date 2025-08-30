import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Pagamentos Parcelados",
  "register": "Registrar Pagamento Parcelado",
  "[id]/index": "Visualizar Pagamento Parcelado",
  "[id]/edit": "Editar Pagamento Parcelado"
}

export default function InstallmentLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    // ESSE TYPE CASTING FOI CONSCIENTE
    const title = headerTitles[routeName as keyof typeof headerTitles] || "Pagamentos Parcelados"
    navigation.setOptions({
      headerTitle: title
    })
  }, [navigation])

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      screenListeners={() => ({
        focus: ({ target, ...rest }) => {
          if(target === undefined) return;
          changeHeaderTitleOfFather(target.split("-")[0])
        }
      })
      }
    />
  )
}