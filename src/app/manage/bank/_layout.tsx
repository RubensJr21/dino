import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Bancos",
  "register": "Registrar Banco",
  "[id]/index": "Visualizar Banco",
  "[id]/edit": "Editar Banco"
}

export default function BankLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    // ESSE TYPE CASTING FOI CONSCIENTE
    const title = headerTitles[routeName as keyof typeof headerTitles] || "Bancos"
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