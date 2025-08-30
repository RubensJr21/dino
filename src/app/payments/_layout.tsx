import { MCIcons } from '@lib/icons.lib';
import { Drawer } from 'expo-router/drawer';

export default function LayoutPayments() {
  return (
    <Drawer
      initialRouteName="standard"
    >
      <Drawer.Screen name="standard"
        options={{
          headerShown: true,
          title: "Pagamentos",
          drawerIcon: (props) => <MCIcons name="cash-minus" {...props} />
        }}
      />

      <Drawer.Screen name="recurring"
        options={{
          headerShown: true,
          title: "Pagamentos Recorrentes",
          drawerIcon: (props) => <MCIcons name="credit-card" {...props} />
        }}
      />

      <Drawer.Screen name="installment"
        options={{
          headerShown: true,
          title: "Pagamentos Parcelados",
          drawerIcon: (props) => <MCIcons name="credit-card-multiple" {...props} />
        }}
      />

    </Drawer>
  )
}