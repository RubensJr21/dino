import { Divider, Text } from "react-native-paper";
import { useRecurringScheduledDetails } from "./context";

export const ScheduledRoute = () => {
  const { items } = useRecurringScheduledDetails()
  return (
    <>
      <Text>Scheduled</Text>
      <Divider />
      {
        Array.from(items).map((item) => 
          <Text style={{color: "red"}} key={`scheduled-${item.created_at}`} >Item {item.id} {item.description}</Text>
        )
      }
    </>
  )
};