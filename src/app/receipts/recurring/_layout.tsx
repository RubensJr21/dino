import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Recebimentos recorrentes",
  "register": "Registrar recebimento recorrente",
  "[id]/index": "Detalhes do recebimento recorrente",
  "[id]/edit": "Editar recebimento recorrente"
}

export default function RecurringLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    // ESSE TYPE CASTING FOI CONSCIENTE
    const title = headerTitles[routeName as keyof typeof headerTitles] || "Recebimentos Recorrentes"
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