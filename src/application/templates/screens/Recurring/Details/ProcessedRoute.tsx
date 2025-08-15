import { Divider, Text } from "react-native-paper";
import { useRecurringProcessedDetails } from "./context";

export const ProcessedRoute = () => {
  const { items } = useRecurringProcessedDetails()
  return (
    <>
      <Text>Processed</Text>
      <Divider />
      {
        Array.from(items).map((item) => 
          <Text style={{color: "red"}} key={item.id} >Item {item.id} {item.description}</Text>
        )
      }
    </>
  )
};