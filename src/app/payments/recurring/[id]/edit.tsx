import { TransactionRecurringEditScreen } from "@pages/TransactionScreenRecurring/edit";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function RecurringEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    <Redirect href={"/payments/recurring"} />
    return;
  }

  return <TransactionRecurringEditScreen id={id} kind="payment" />
}