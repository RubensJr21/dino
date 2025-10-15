import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Pagamentos recorrentes",
  "register": "Registrar pagamento recorrente",
  "[id]/index": "Detalhes do pagamento recorrente",
  "[id]/edit": "Editar pagamento recorrente"
}

export default function RecurringLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    // ESSE TYPE CASTING FOI CONSCIENTE
    const title = headerTitles[routeName as keyof typeof headerTitles] || "Pagamentos Recorrentes"
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