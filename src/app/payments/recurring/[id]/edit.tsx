import { TransactionRecurringScreen } from "@pages/TransactionScreenRecurring";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function RecurringEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    <Redirect href={"/payments/recurring"} />
    return;
  }

  return <TransactionRecurringScreen id={id} kind="payment" />
}