import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Edit, { EditParams } from "./edit";
import Home, { HomeParams } from "./home";
import Register, { RegisterParams } from "./register";

export type BankAccountsStackParamList = {
  Home: HomeParams;
  Register: RegisterParams;
  Edit: EditParams;
}

const Stack = createNativeStackNavigator<BankAccountsStackParamList>()

export default function BankAccountsRoutes(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
      />
    </Stack.Navigator>
  )
}