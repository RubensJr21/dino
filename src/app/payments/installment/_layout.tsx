import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Installment",
  "register": "Register Installment",
  "[id]/index": "View Installment",
  "[id]/edit": "Edit Installment"
}

export default function InstallmentLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    const title = headerTitles[routeName] || "Installment"
    navigation.setOptions({
      headerTitle: title
    })
  }, [navigation])

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      screenListeners={() => ({
        focus: ({ target, ...rest }) => {
          changeHeaderTitleOfFather(target.split("-")[0])
        }
      })
      }
    />
  )
}