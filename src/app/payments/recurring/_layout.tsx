import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Pagamentos Recorrentes",
  "register": "Registrar Pagamento Recorrente",
  "[id]/index": "Visualizar Pagamento Recorrente",
  "[id]/edit": "Editar Pagamento Recorrente"
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