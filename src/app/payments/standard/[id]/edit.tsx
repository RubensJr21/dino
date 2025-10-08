import { TransactionStandardEditScreen } from "@pages/TransactionScreens/Standard/edit";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function StandardEdit() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  if (!id) {
    <Redirect href={"/payments/standard"} />
    return;
  }

  return <TransactionStandardEditScreen id={id} kind="payment" />
}