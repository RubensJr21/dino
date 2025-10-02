import { MCIcons } from "@lib/icons.lib";
import Drawer from "expo-router/drawer";

export default function LayoutReports() {
  return (
    <Drawer initialRouteName="by-origin">
      <Drawer.Screen name="by-origin"
        options={{
          headerShown: true,
          title: "Bancos e Dinheiro",
          drawerIcon: (props) => <MCIcons name="bank-outline" {...props} />
        }}
      />
      <Drawer.Screen name="by-category"
        options={{
          headerShown: true,
          title: "Categorias",
          drawerIcon: (props) => <MCIcons name="bank-outline" {...props} />
        }}
      />
    </Drawer>
  )
}