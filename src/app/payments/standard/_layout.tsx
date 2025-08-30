import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Pagamentos",
  "register": "Registrar Pagamento",
  "[id]/index": "Visualizar Pagamento",
  "[id]/edit": "Editar Pagamento"
}

export default function StandardLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    // ESSE TYPE CASTING FOI CONSCIENTE
    const title = headerTitles[routeName as keyof typeof headerTitles] || "Pagamentos"
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