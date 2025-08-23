import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";

const headerTitles = {
  "index": "Standard",
  "register": "Register Standard",
  "[id]/index": "View Standard",
  "[id]/edit": "Edit Standard"
}

export default function StandardLayout() {
  const navigation = useNavigation();

  const changeHeaderTitleOfFather = useCallback((routeName: string) => {
    const title = headerTitles[routeName] || "Standard"
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