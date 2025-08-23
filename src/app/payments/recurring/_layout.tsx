import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Recurring",
  "register": "Register Recurring",
  "[id]/index": "View Recurring",
  "[id]/edit": "Edit Recurring"
}

export default function RecurringLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    const title = headerTitles[routeName] || "Recurring"
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