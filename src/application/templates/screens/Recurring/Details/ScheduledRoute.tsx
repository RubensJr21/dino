import { Divider, Text } from "react-native-paper";
import { useRecurringScheduledDetails } from "./context";

export const ScheduledRoute = () => {
  const { items } = useRecurringScheduledDetails()
  return (
    <>
      <Text>Scheduled</Text>
      <Divider />
      {
        items.values().map((item) => {
          <Text style={{color: "red"}}>{item.description}</Text>
        })
      }
    </>
  )
};