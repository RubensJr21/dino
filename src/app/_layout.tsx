import { PortalHost } from "@rn-primitives/portal";
import { MCIcons } from "@src/application/components/Icons.lib";
import { Tabs } from "expo-router";
import { verifyInstallation } from 'nativewind';

import "../global.css";

export default function Layout() {
  verifyInstallation();
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: (props) => <MCIcons name="home" {...props} />
          }}
        />
        {/* <Tabs.Screen
        name="receipts"
        options={{
          headerShown: false
        }}
      /> */}
        <Tabs.Screen
          name="payments"
          options={{
            headerShown: false,
            title: "Pagamentos",
            tabBarIcon: (props) => <MCIcons name="cash-minus" {...props} />
          }}
        />
        <Tabs.Screen
          name="manage"
          options={{
            headerShown: false,
            title: 'Gerenciar',
            tabBarIcon: (props) => <MCIcons name="wallet-outline" {...props} />
          }}
        />
      </Tabs>
      <PortalHost />
    </>
  )
}