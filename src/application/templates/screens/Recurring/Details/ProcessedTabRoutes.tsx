import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MdiIcons } from "@src/application/components/ChooseIcon";
import { useTheme } from "react-native-paper";
import { ProcessedRoute } from "./ProcessedRoute";
import { ScheduledRoute } from "./ScheduledRoute";

export type ProcessedTabParamList = {
  Processed: undefined;
  Scheduled: undefined;
}

const Tab = createBottomTabNavigator<ProcessedTabParamList>();

export function ProcessedTabRoutes() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Processed"
      screenOptions={{
        headerShown: false,
        tabBarPosition: "top",
        tabBarStyle: {
          backgroundColor: theme.colors.elevation.level5,
          marginTop: 5,
          borderRadius: 10,
          marginHorizontal: 10,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.inversePrimary,
        sceneStyle: { paddingTop: 5 },
      }}>
      <Tab.Screen
        name="Processed"
        component={ProcessedRoute}
        options={{
          title: 'Processados',
          tabBarIcon: ({ color, size }) => (
            <MdiIcons name="cash-check" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scheduled"
        component={ScheduledRoute}
        options={{
          title: 'Agendados',
          tabBarIcon: ({ color, size }) => (
            <MdiIcons name="cash-clock" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}