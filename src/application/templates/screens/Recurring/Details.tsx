// ALERT: Implementar tela de detalhamento dos itens recorrentes

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MdiIcons } from "@src/application/components/ChooseIcon";
import { ItemValue } from "@src/core/entities/item_value.entity";
import { Recurring } from "@src/core/entities/recurring.entity";
import { useEffect, useState } from "react";
import { Text, useTheme } from "react-native-paper";

interface DetailsRecurringScreenTemplateProps {
  recurring_id: Recurring["id"];
  getRecurrings: (recurring_id: Recurring["id"]) => Promise<ItemValue[] | undefined>;
}

export default function RecurringDetailsScreenTemplate({ recurring_id, getRecurrings }: DetailsRecurringScreenTemplateProps) {
  const [processedItemValueRecurrings, setProcessedItemValueRecurrings] = useState<ItemValue[]>([]);
  const [unprocessedItemValueRecurrings, setUnprocessedItemValueRecurrings] = useState<ItemValue[]>([]);

  useEffect(() => {
    getRecurrings(recurring_id).then((itemValues) => {
      if (itemValues) {
        const processed: ItemValue[] = []
        const unprocessed: ItemValue[] = []
        for (const item of itemValues) {
          if (!item.was_processed) {
            unprocessed.push(item);
            continue;
          }
          processed.push(item);
        }
        setProcessedItemValueRecurrings(processed);
        setUnprocessedItemValueRecurrings(unprocessed);
      }
    }).catch((error) => {
      console.error("Error fetching recurring items:", error);
    })
  }, [recurring_id]);

  return (
    <ProcessedTabRoutes />
  );
}

const ProcessedRoute = () => <Text>Processed</Text>;

const ScheduledRoute = () => <Text>Scheduled</Text>;

export type ProcessedTabParamList = {
  Processed: undefined;
  Scheduled: undefined;
}

const Tab = createBottomTabNavigator<ProcessedTabParamList>();

function ProcessedTabRoutes() {
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