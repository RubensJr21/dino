import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BankAccountsRoutes from "./BankAccounts/routes";
import Home from "./home";

export type ManageStackParamList = {
  Home: undefined;
  BankAccounts: undefined;
}

const Stack = createNativeStackNavigator<ManageStackParamList>()

export default function ManageRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="BankAccounts"
        component={BankAccountsRoutes}
      />
    </Stack.Navigator>
  )
}