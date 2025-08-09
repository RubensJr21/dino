import { Divider, Text } from "react-native-paper";
import { useRecurringProcessedDetails } from "./context";

export const ProcessedRoute = () => {
  const { items } = useRecurringProcessedDetails()
  return (
    <>
      <Text>Processed</Text>
      <Divider />
      {
        items.values().map((item) => {
          <Text style={{color: "red"}}>{item.description}</Text>
        })
      }
    </>
  )
};