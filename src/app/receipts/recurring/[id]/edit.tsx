import { TransactionRecurringEditScreen } from "@pages/FormScreens/Recurring/edit";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function RecurringEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    <Redirect href={"/receipts/recurring"} />
    return;
  }

  return <TransactionRecurringEditScreen id={id} kind="receipt" />
}