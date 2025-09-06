import { MCIcons } from "@lib/icons.lib";
import Drawer from "expo-router/drawer";

export default function LayoutManage() {
  return (
  <Drawer initialRouteName="bank">
    <Drawer.Screen name="bank"
        options={{
          headerShown: true,
          title: "Bancos",
          drawerIcon: (props) => <MCIcons name="bank-outline" {...props} />
        }}
      />

    <Drawer.Screen name="credit-card"
        options={{
          headerShown: true,
          title: "Cartões de crédito",
          drawerIcon: (props) => <MCIcons name="credit-card-multiple-outline" {...props} />
        }}
      />
  </Drawer>
)
}